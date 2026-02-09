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

**Available Return Types:**
- `value`: Returns the field's value (default)
- `label`: Returns the selected option's label (for choose/select fields)
- `field_label`: Returns the field's label/title
- `calculated_value`: Returns the calculation value from data-calculation-value attribute (for choose/select fields)
- `option_value(optionName)`: Returns the value of a specific option in a choose field
- `option_calc_value(optionName)`: Returns the calculation value of a specific option in a choose field

**Note for Select Fields:** Select fields now support `calculated_value` and `label` tokens. To use these, configure the "Value for calculation" field in your select options, which will be used as the `data-calculation-value` attribute.

**Examples:**
```
#field(first_name)
```
Gets the value of the "first_name" field.

```
#field(service_type, label)
```
Gets the label of the selected option in the "service_type" choose field.

```
#field(service_type, field_label)
```
Gets the field label/title of the "service_type" field.

```
#field(service_type, calculated_value)
```
Gets the sum of calculation values from all checked options in the "service_type" field.

```
#field(service_type, option_value(premium))
```
Gets the value of the "premium" option in the "service_type" field.

```
#field(service_type, option_calc_value(premium))
```
Gets the calculation value of the "premium" option in the "service_type" field.

```javascript
#field(package_type, option_value(basic))
```
Gets the value "basic" from a select field named "package_type".

```javascript
#field(package_type, option_calc_value(basic))
```
Gets the calculation value (e.g., 25.00) of the "basic" option from a select field.

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

EA Forms provides several mathematical functions to help with calculations. All math functions use the `math_` prefix.

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

```
#math_round(#field(price) * 1.15, 2)
```
Rounds the result of multiplying the price field by 1.15 to 2 decimal places.

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

```
#math_abs(#field(discount) - #field(price))
```
Returns the absolute difference between discount and price fields.

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

```
#math_min(#field(price), #field(max_price), 100)
```
Returns the smallest value among the price field, max_price field, and 100.

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

```
#math_max(#field(min_price), #field(price), 50)
```
Returns the largest value among the min_price field, price field, and 50.

#### To Fixed (Format Decimals)

**Syntax:**
```
#to_fixed(value, [decimals])
```

**Parameters:**
- `value`: The number to format
- `decimals` (optional): Number of decimal places, defaults to 2

**Description:** Formats a number with a fixed number of decimal places, including trailing zeros. Unlike `#math_round`, this always shows exactly N decimal places.

**Example:**
```
#to_fixed(1.5, 2)
```
Returns "1.50".

```
#to_fixed(#field(price), 2)
```
Formats the price field value with 2 decimal places for consistent currency display.

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

## Option-Specific Tokens

For choose fields (radio buttons, checkboxes) and select fields, you can access specific option values and calculation values.

### Option Value Token

**Syntax:**
```
#field(fieldName, option_value(optionName))
```

**Parameters:**
- `fieldName`: The name of the choose field or select field
- `optionName`: The value of the specific option you want to access

**Example:**
```
#field(service_type, option_value(premium))
```
Returns the value "premium" if that option exists in the service_type field.

### Option Calculation Value Token

**Syntax:**
```
#field(fieldName, option_calc_value(optionName))
```

**Parameters:**
- `fieldName`: The name of the choose field or select field
- `optionName`: The value of the specific option you want to access

**Example:**
```
#field(service_type, option_calc_value(premium))
```
Returns the calculation value (e.g., 25.00) of the "premium" option from its data-calculation-value attribute.

### Select Field Option Tokens

Select fields now support the same option-specific tokens as choose fields. This allows you to access individual option values and calculation values from select dropdowns.

**Examples:**

```javascript
#field(package_type, option_value(basic))
```
Returns the value "basic" from a select field named "package_type".

```javascript
#field(package_type, option_calc_value(basic))
```
Returns the calculation value (e.g., 25.00) of the "basic" option from a select field.

```javascript
#field(package_type, option_calc_value(premium))
```
Returns the calculation value of the "premium" option from a select field.

**Note:** For select fields, you can use these tokens to access any option's value or calculation value, regardless of whether it's currently selected. This is useful for conditional calculations or displaying information about different package options.

## Common Use Cases

### Price Calculator with Options

```
Base Price: $#field(base_price)
Premium Service: $#field(service_type, option_calc_value(premium))
Total: $#calc(#field(base_price) + #field(service_type, option_calc_value(premium)))
```

### Dynamic Pricing Based on Selected Options

```
Selected Service: #field(service_type, label)
Service Cost: $#field(service_type, calculated_value)
Total: $#calc(#field(base_price) + #field(service_type, calculated_value))
```

### Average Score Calculator

```
Average Score: #math_round(#repeater_field(scores, value, avg), 1)
```

### Dynamic Content with Field Labels

```
Thank you, #field(first_name)! 
You selected: #field(service_type, label)
Field: #field(service_type, field_label)
Your order includes #repeater(order_items, rows_count) items.
```

### Row-specific Calculations

```
Subtotal: $#calc(#repeater_field(products, price[current]) * #repeater_field(products, quantity[current]))
```

### Select Field with Calculation Values

```
Service Type: #field(service_type, label)
Service Cost: $#field(service_type, calculated_value)
Total: $#calc(#field(base_price) + #field(service_type, calculated_value))
```

### Multiple Select with Calculations

```
Selected Options: #field(add_ons, label)
Add-on Cost: $#field(add_ons, calculated_value)
Base Price: $#field(base_price)
Total: $#calc(#field(base_price) + #field(add_ons, calculated_value))
```

### Advanced Pricing Calculator

```
Service Calculator:
Base Service: $#field(base_service)
Add-ons Selected: #field(add_ons, label)
Add-on Cost: $#field(add_ons, calculated_value)
Quantity: #field(quantity)
Subtotal: $#calc(#field(base_service) + #field(add_ons, calculated_value))
Total: $#calc((#field(base_service) + #field(add_ons, calculated_value)) * #field(quantity))
```

### Dynamic Discount System

```
Original Price: $#field(original_price)
Discount Percentage: #field(discount_percent)%
Discount Amount: $#calc(#field(original_price) * #field(discount_percent) / 100)
Final Price: $#calc(#field(original_price) - (#field(original_price) * #field(discount_percent) / 100))
```

### Inventory Management

```
Current Stock: #field(current_stock)
Items Ordered: #repeater_field(order_items, quantity, sum)
Remaining Stock: #calc(#field(current_stock) - #repeater_field(order_items, quantity, sum))
Low Stock Alert: #math_min(#field(current_stock), #field(min_stock_level))
```

### Time-Based Calculations

```
Start Time: #field(start_time)
End Time: #field(end_time)
Duration: #calc(#field(end_time) - #field(start_time)) hours
Overtime Hours: #math_max(0, #calc(#field(end_time) - #field(start_time)) - 8)
Overtime Pay: $#calc(#math_max(0, #calc(#field(end_time) - #field(start_time)) - 8) * #field(overtime_rate))
```

## Performance Considerations

The EA Forms calculation system is designed to be efficient by:

1. **Event-Driven Updates**: Using specific event listeners for different input types
   - `input` events for text fields (immediate response)
   - `change` events for checkboxes/radio buttons (prevents duplicate calculations)
   - `keyup` and `change` events for number fields (handles both typing and pasting)

2. **Caching Strategy**: 
   - Original values are cached to avoid unnecessary recalculations
   - Only processes tokens when field values actually change
   - Uses `data-eaf-original-value` and `data-eaf-original-content` attributes

3. **Optimized Processing**:
   - Tokens are processed only when needed
   - Nested token evaluation is handled efficiently
   - Performance logging helps identify bottlenecks

4. **Repeater Optimization**:
   - Repeater calculations are batched to avoid excessive DOM queries
   - Current context detection is optimized for performance
   - Index-based lookups are cached when possible

### Performance Monitoring

The system includes built-in performance monitoring:

```javascript
// Console output example:
Form calculation #1 completed in 2.34ms
Form calculation #2 completed in 1.87ms
```

This helps identify when calculations are taking too long and may need optimization.

## Troubleshooting

If your tokens aren't working as expected:

1. Check the syntax carefully, including parentheses and commas
2. Verify field names are correct and match exactly
3. Check the browser console for any error messages
4. Make sure field values can be converted to numbers when used in calculations
5. For complex tokens, build them step by step to identify issues
6. When using `[current]` in repeaters, ensure your element is properly inside a repeater item
7. For repeater calculations, check that your field names and structure match the expected pattern
8. For option-specific tokens, verify the option name matches exactly (case-sensitive)
9. Ensure choose fields have the proper data-calculation-value attributes for calculated_value tokens

### Common Error Messages and Solutions

- `"Invalid characters in calculation expression"`: Check that your calculation uses only valid mathematical operators and numbers
- `"Not enough parameters for repeater_field token"`: Ensure you're providing both repeater name and field name
- `"Unknown property for repeater"`: Verify you're using a valid property name (rows_count, first_index, last_index)
- `"Could not determine current repeater item index"`: Make sure the token with `[current]` is used within a repeater context
- `"Option not found"`: Check that the option name in option_value() or option_calc_value() matches exactly
- `"Field is not a choose field"`: Ensure you're using option-specific tokens only with choose fields (radio/checkbox)
- `"Invalid number for rounding"`: Make sure the first parameter of math_round is a valid number
- `"No valid numbers provided for min/max function"`: Ensure all parameters in math_min/math_max are valid numbers

### Debugging Techniques

1. **Console Logging**: Open browser developer tools to see calculation logs and error messages
2. **Step-by-Step Testing**: Build complex tokens incrementally to isolate issues
3. **Field Name Verification**: Double-check field names match exactly (case-sensitive)
4. **Data Type Checking**: Ensure numeric fields contain valid numbers for calculations
5. **Repeater Structure**: Verify repeater field structure matches your token expectations

### Performance Issues

If calculations are running slowly:

1. **Check Token Complexity**: Simplify nested token expressions
2. **Monitor Console**: Look for performance warnings in browser console
3. **Reduce Repeater Size**: Large repeaters with many calculations can impact performance
4. **Optimize Events**: Ensure you're not triggering unnecessary recalculations

### Browser Compatibility

The token system works in all modern browsers. If you encounter issues:

1. **JavaScript Errors**: Check browser console for JavaScript errors
2. **Event Handling**: Some older browsers may have different event handling
3. **DOM Queries**: Modern browsers handle DOM queries more efficiently

### Field Type Compatibility

**Text Fields** (text, email, phone, number, hidden, textarea):
- `value`: ✅ Returns the field's value
- `field_label`: ✅ Returns the field's label
- `label`: ❌ Not applicable
- `calculated_value`: ❌ Not applicable
- `option_value()`: ❌ Not applicable
- `option_calc_value()`: ❌ Not applicable

**Choose Fields** (radio, checkbox):
- `value`: ✅ Returns selected value(s) or sum if numeric
- `field_label`: ✅ Returns the field's label
- `label`: ✅ Returns selected option label(s)
- `calculated_value`: ✅ Returns sum of data-calculation-value attributes
- `option_value()`: ✅ Returns specific option value
- `option_calc_value()`: ✅ Returns specific option calculation value

**Select Fields**:
- `value`: ✅ Returns selected value(s)
- `field_label`: ✅ Returns the field's label
- `label`: ✅ Returns selected option label(s)
- `calculated_value`: ✅ Returns sum of data-calculation-value attributes from selected options
- `option_value()`: ✅ Returns specific option value
- `option_calc_value()`: ✅ Returns specific option calculation value