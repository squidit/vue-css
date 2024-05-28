# SqWindowHelper

A utility service for working with the window object.

## Description

`SqWindowHelper` is a utility class that provides methods to retrieve the window object.

## Methods

### ` window(): (Window & typeof globalThis) | null`

Allow to get the window object inside ssr.

- Returns: The window object.

## Example Usage

```typescript
import { SqWindowHelper } from '@squidit/vue-css'

// Create an instance of SqWindowHelper
const sqWindowHelper = new SqWindowHelper()

// Return Window
const window = sqWindowHelper.window()
console.log('Window:', window)
```