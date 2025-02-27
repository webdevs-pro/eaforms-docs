---
id: calculation-tokens
title: Calculation Tokens
sidebar_label: Calculation Tokens
---

# EA Forms - Calculation Tokens Documentation

## Introduction

EA Forms includes a powerful token system that allows you to create dynamic content, perform calculations, and reference values from other form fields. Tokens can be used in field values, labels, instructions, and other form elements.

## Token Syntax

All tokens follow this syntax pattern:
```
#tokenName(parameters)
```

- Tokens always start with a `#` character
- Followed by the token name (like `field`, `calc`, etc.)
- Parameters are enclosed in parentheses
- Multiple parameters are separated by commas
- Tokens can be nested inside other tokens

## Available Tokens

### Field Value Token

The field token allows you to get the value of any form field.

**Syntax:**
```
#field(fieldName, [type])
```

**Parameters:**
- `fieldName`: The name of the field whose value you want to get
- `type` (optional): The type of data to return, defaults to 'value'

**Example:**
```
#field(first_name)
```
Gets the value of the "first_name" field.

### Calculation Token

The calc token allows you to perform mathematical calculations.

**Syntax:**
```
#calc(expression)
```

**Parameters:**
- `expression`: A mathematical expression using standard operators (+, -, *, /)

**Example:**
```
#calc(10 + 5)
```
Returns 15.

```
#calc(#field(price) * #field(quantity))
```
Multiplies the value of the "price" field by the value of the "quantity" field.

### Repeater Field Token

This token allows you to perform operations on repeater field values.

**Syntax:**
```
#repeater_field(repeaterName, fieldName, [operation])
```

**Parameters:**
- `repeaterName`: The name of the repeater field
- `fieldName`: The name of the field within the repeater
  - Can include an index in square brackets like `fieldName[2]` or `fieldName[current]` to target a specific item
- `operation` (optional): The operation to perform on the values, defaults to 'sum'
  - `sum`: Calculates the total sum of all field values
  - `avg`: Calculates the average (mean) of all field values
  - `min`: Returns the smallest value among all field values
  - `max`: Returns the largest value among all field values  
  - `count`: Returns the number of items in the repeater

**Index Specifiers:**
When using a specific index in square brackets after the field name, the following options are available:
- Number (0, 1, 2, etc.): Targets the field at a specific index
- `first`: Targets the field at the first index
- `last`: Targets the field at the last index
- `current`: Targets the field in the current repeater row (contextual)

**Examples:**
```
#repeater_field(order_items, price, sum)
```
Sums the 'price' values from all 'order_items' repeater instances.

```
#repeater_field(order_items, price, avg)
```
Calculates the average of all 'price' values in the 'order_items' repeater.

```
#repeater_field(order_items, price, min)
```
Returns the smallest 'price' value from all 'order_items' repeater instances.

```
#repeater_field(order_items, price, max)
```
Returns the largest 'price' value from all 'order_items' repeater instances.

```
#repeater_field(order_items, price, count)
```
Returns the number of items in the 'order_items' repeater.

**Accessing specific items:**
```
#repeater_field(order_items, price[current])
```
Gets the price value from the current 'order_items' repeater instance.

```
#repeater_field(order_items, price[last])
```
Gets the price value from the last 'order_items' repeater instance.

```
#repeater_field(order_items, price[first])
```
Gets the price value from the first 'order_items' repeater instance.

```
#repeater_field(order_items, price[2])
```
Gets the price value from the third 'order_items' repeater instance (index 2).

### Repeater Widget Data Token

This token allows you to get metadata about a repeater widget.

**Syntax:**
```
#repeater(repeaterName, property)
```

**Parameters:**
- `repeaterName`: The name of the repeater widget
- `property`: The property to retrieve, options include:
  - `rows_count`: Returns the total number of rows in the repeater
  - `first_index`: Returns the index of the first row (always 1)
  - `last_index`: Returns the index of the last row (same as rows_count)

**Examples:**
```
#repeater(order_items, rows_count)
```
Returns the number of rows in the 'order_items' repeater.

```
#repeater(order_items, last_index)
```
Returns the index of the last row in the 'order_items' repeater.

### Math Functions

EA Forms provides several mathematical functions to help with calculations.

#### Round

**Syntax:**
```
#math_round(number, [decimals])
```

**Parameters:**
- `number`: The number to round
- `decimals` (optional): Number of decimal places, defaults to 0

**Example:**
```
#math_round(3.14159, 2)
```
Returns 3.14.

#### Absolute Value

**Syntax:**
```
#math_abs(number)
```

**Parameters:**
- `number`: The number to get the absolute value of

**Example:**
```
#math_abs(-10)
```
Returns 10.

#### Minimum Value

**Syntax:**
```
#math_min(number1, number2, ...)
```

**Parameters:**
- `number1, number2, ...`: Two or more numbers to compare

**Example:**
```
#math_min(5, 10, 3, 8)
```
Returns 3 (the smallest value).

#### Maximum Value

**Syntax:**
```
#math_max(number1, number2, ...)
```

**Parameters:**
- `number1, number2, ...`: Two or more numbers to compare

**Example:**
```
#math_max(5, 10, 3, 8)
```
Returns 10 (the largest value).

## Nesting Tokens

Tokens can be nested inside other tokens to create more complex expressions.

**Example:**
```
#calc(#field(base_price) + #repeater_field(options, price, sum))
```
Adds the base_price field value to the sum of all option prices in the repeater.

## Using Tokens in Form Elements

You can use tokens in various form elements:

1. **Field Default Values**: Set dynamic default values based on other fields
2. **Calculated Fields**: Create fields that display calculations based on other field values
3. **Labels and Instructions**: Create dynamic labels that change based on form data
4. **Hidden Fields**: Store calculated values for submission
5. **Conditional Logic**: Use tokens in conditions for showing/hiding elements

## Working with Repeaters

Repeater fields allow for adding multiple sets of fields. The token system provides powerful ways to work with repeater data:

### Calculations within a Repeater Row

When working within a repeater row, you can use the `current` index to reference the current row:

```
#repeater_field(product_options, price[current])
```

This is particularly useful for creating calculated fields within repeater rows that reference other fields in the same row.

### Understanding the "current" Context

The `[current]` index specifier is contextual and depends on where the calculation is being performed:

1. When used within a repeater item, it automatically detects which row you're in
2. When used in a field that's being edited, it identifies the current context
3. The system uses various methods to identify the current repeater item index:
   - Looking for the closest `.eaf-repeater-item` parent element
   - Analyzing input field names for index patterns like `fieldname[index]`
   - Using data attributes when available

### Aggregating Repeater Data

To perform calculations across all repeater rows:

```
Total: #repeater_field(order_items, price, sum)
Average: #math_round(#repeater_field(order_items, price, avg), 2)
Highest Price: #repeater_field(order_items, price, max)
Total Items: #repeater(order_items, rows_count)
```

## Common Use Cases

### Price Calculator

```
Total: $#calc(#field(base_price) + #repeater_field(extras, price, sum))
```

### Average Score Calculator

```
Average Score: #math_round(#repeater_field(scores, value, avg), 1)
```

### Dynamic Content

```
Thank you, #field(first_name)! Your order includes #repeater(order_items, rows_count) items.
```

### Row-specific Calculations

```
Subtotal: $#calc(#repeater_field(products, price[current]) * #repeater_field(products, quantity[current]))
```

## Performance Considerations

The EA Forms calculation system is designed to be efficient by:

1. Using specific event listeners for different input types
2. Caching original values to avoid unnecessary recalculations
3. Processing tokens only when needed
4. Using appropriate events (input, change, keyup) for different field types

## Troubleshooting

If your tokens aren't working as expected:

1. Check the syntax carefully, including parentheses and commas
2. Verify field names are correct and match exactly
3. Check the browser console for any error messages
4. Make sure field values can be converted to numbers when used in calculations
5. For complex tokens, build them step by step to identify issues
6. When using `[current]` in repeaters, ensure your element is properly inside a repeater item
7. For repeater calculations, check that your field names and structure match the expected pattern

### Common Error Messages and Solutions

- `"Invalid characters in calculation expression"`: Check that your calculation uses only valid mathematical operators and numbers
- `"Not enough parameters for repeater_field token"`: Ensure you're providing both repeater name and field name
- `"Unknown property for repeater"`: Verify you're using a valid property name (rows_count, first_index, last_index)
- `"Could not determine current repeater item index"`: Make sure the token with `[current]` is used within a repeater context