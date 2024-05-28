# SqColorsHelper

A utility service for working with colors.

## Description

`SqColorsHelper` is a utility class that provides methods to retrieve CSS variable values and to lighten or darken colors.

## Methods

### `getCssVariableValue(variableName: string): string`

Get the value of a CSS variable.

- `variableName`: The name of the CSS variable (e.g., 'var(--pink)').
- Returns: The value of the CSS variable or the variableName if not found.

### `lightenDarkenColor(color: string, amount: number): string`

Lighten or darken a color by a specified amount.

- `color`: The color to be adjusted (e.g., '#e41b6e' or 'var(--pink)').
- `amount`: The amount to lighten or darken the color (positive for lighten, negative for darken).
- Returns: The adjusted color in hexadecimal format (e.g., '#e41b6e').

## Example Usage

```typescript
import { SqColorsHelper } from '@squidit/vue-css'

// Create an instance of SqColorsHelper
const sqColorsHelper = new SqColorsHelper()

// Return CSS variable value
const color = 'var(--pink)'
const value = sqColorsHelper?.getCssVariableValue(color)
console.log('CSS variable value:', value)

// Return adjusted color lighten or darken
const color = '#e41b6e'
const adjustedColor = sqColorsHelper?.lightenDarkenColor(color, -25)
console.log('Adjusted color:', adjustedColor)
```