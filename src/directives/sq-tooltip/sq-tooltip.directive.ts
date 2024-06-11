import { Directive, DirectiveBinding, nextTick } from 'vue'

type Placement =
  | 'left top'
  | 'left center'
  | 'left bottom'
  | 'center top'
  | 'center center'
  | 'center bottom'
  | 'right top'
  | 'right center'
  | 'right bottom'

type Theme = 'light' | 'dark'

type Trigger = 'hover' | 'click'

export const tooltip: Directive = {
  mounted(element: HTMLElement, binding: DirectiveBinding) {
    const content = binding.value
    const placement: Placement = (element.getAttribute('placement') as Placement) || 'center top'
    const delay = parseInt(element.getAttribute('delay') || '0')
    const theme: Theme = (element.getAttribute('theme') as Theme) || 'dark'
    const trigger: Trigger = (element.getAttribute('trigger') as Trigger) || 'hover'

    let tooltipElement: HTMLElement | null = null
    let open = false

    const windowObj = window

    const isTouch = () => {
      const maxTouchPoints = navigator.maxTouchPoints & 0xff
      return 'ontouchstart' in windowObj || maxTouchPoints > 0
    }

    const show = async () => {
      create()
      setPosition()
      document.addEventListener('click', hide, true)
      if (tooltipElement) {
        tooltipElement.classList.add('tooltip-show')
        await nextTick()
        open = true
      }
    }

    const hide = () => {
      if ((tooltipElement && (isTouch() || trigger === 'click') && open) || (!isTouch() && trigger === 'hover')) {
        try {
          if (tooltipElement) {
            tooltipElement.classList.remove('tooltip-show')
          }
        } catch (e) {
          // Ignore error
        }
        windowObj.setTimeout(() => {
          try {
            if (tooltipElement) {
              document.body.removeChild(tooltipElement)
            }
          } catch (e) {
            // Ignore error
          }
          open = false
          document.removeEventListener('click', hide, true)
          tooltipElement = null
        }, delay)
      }
    }

    const create = () => {
      if (content) {
        const arrow = document.createElement('div')
        arrow.classList.add('tooltip-arrow')
        if (isTouch()) {
          arrow.classList.add('tooltip-not-arrow')
        }
        tooltipElement = document.createElement('div')
        if (tooltipElement) {
          if (typeof content === 'string') {
            tooltipElement.innerHTML = content
          }
        }

        tooltipElement.classList.add('tooltip')
        tooltipElement.classList.add('tooltip-generated')
        tooltipElement.classList.add(`tooltip-${theme}`)
        tooltipElement.classList.add(`tooltip-${placement.replace(' ', '-')}`)
        tooltipElement.classList.add('text-left')
        tooltipElement.style.transition = `opacity ${delay}ms`

        tooltipElement.appendChild(arrow)
        document.body.appendChild(tooltipElement)
      }
    }

    const setPosition = () => {
      if (tooltipElement) {
        const parentCoords = element.getBoundingClientRect()
        const tooltipCoords = tooltipElement.getBoundingClientRect()

        const posHorizontal = placement.split(' ')[0] || 'center'
        const posVertical = placement.split(' ')[1] || 'bottom'

        const distance = 7

        let top
        let left

        switch (posHorizontal) {
          case 'left':
            left = parentCoords.left - distance - tooltipCoords.width
            if (parentCoords.left - tooltipCoords.width < 0) {
              left = distance
            }
            break

          case 'right':
            left = parentCoords.right + distance
            if (parentCoords.right + tooltipCoords.width > document.documentElement.clientWidth) {
              left = document.documentElement.clientWidth - tooltipCoords.width - distance
            }
            break

          default:
          case 'center':
            left = parentCoords.left - tooltipCoords.width / 2 + parentCoords.width / 2
        }

        switch (posVertical) {
          case 'center':
            top = (parentCoords.top + parentCoords.bottom) / 2 - tooltipElement.offsetHeight / 2
            break

          case 'bottom':
            top = parentCoords.bottom + distance
            break

          default:
          case 'top':
            top = parentCoords.top - tooltipElement.offsetHeight - distance
        }

        tooltipElement.style.left = `${left < 0 ? parentCoords.left : left}px`
        const scrollY = windowObj.scrollY || 0
        tooltipElement.style.top = `${(top < 0 ? parentCoords.bottom + distance : top) + scrollY}px`
      }
    }

    const onMouseEnter = () => {
      if (!isTouch() && !tooltipElement && trigger === 'hover') {
        show()
      }
    }

    const onMouseLeave = () => {
      if (tooltipElement && trigger === 'hover' && !isTouch()) {
        hide()
      }
    }

    const onClick = () => {
      if (tooltipElement && (trigger === 'click' || isTouch())) {
        hide()
      }
      if (!tooltipElement && (trigger === 'click' || isTouch())) {
        show()
      }
    }

    element.addEventListener('mouseenter', onMouseEnter)
    element.addEventListener('mouseleave', onMouseLeave)
    element.addEventListener('click', onClick)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(element as any).toolipHandlers = {
      onMouseEnter,
      onMouseLeave,
      onClick,
      hide,
    }
  },
  unmounted(element: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { onMouseEnter, onMouseLeave, onClick, hide } = (element as any).toolipHandlers

    element.removeEventListener('mouseenter', onMouseEnter)
    element.removeEventListener('mouseleave', onMouseLeave)
    element.removeEventListener('click', onClick)
    hide()
  },
}
