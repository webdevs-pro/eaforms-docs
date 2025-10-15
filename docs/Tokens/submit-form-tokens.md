---
id: submit-form-tokens
title: Submit Form Tokens
sidebar_label: Submit Form Tokens
---

# Submit Form Tokens

## Introduction

Submit form tokens are special tokens that can be used in form submission actions, email notifications, and other post-submission processes. These tokens allow you to dynamically insert form data, calculated values, site information, user data, and post information into various contexts after form submission.

## Available Submit Form Tokens

### Field Value Token

**Syntax:**
```
#field(fieldName, [type])
```

**Parameters:**
- `fieldName`: The name of the field whose value you want to get
- `type` (optional): The type of data to return, defaults to 'value'

**Available Return Types:**
- `value`: Returns the field's submitted value
- `label`: Returns the selected option's label (for choose/select fields)
- `field_label`: Returns the field's label/title
- `calculated_value`: Returns the calculation value from data-calculation-value attribute (for choose/select fields)
- `option_value(optionName)`: Returns the value of a specific option in a choose or select field
- `option_calc_value(optionName)`: Returns the calculation value of a specific option in a choose or select field

**Note for Select Fields:** Select fields now support `calculated_value`, `label`, `option_value()`, and `option_calc_value()` tokens. To use these, configure the "Value for calculation" field in your select options, which will be used as the `data-calculation-value` attribute.

**Examples:**
```
Hello #field(first_name), thank you for your submission!
Selected Service: #field(service_type, label)
Service Cost: $#field(service_type, calculated_value)
```

### Calculation Token

**Syntax:**
```
#calc(expression)
```

**Parameters:**
- `expression`: A mathematical expression using standard operators (+, -, *, /)

**Example:**
```
Total Amount: $#calc(#field(base_price) + #field(tax))
```

### Repeater Field Token

**Syntax:**
```
#repeater_field(repeaterName, fieldName, [operation])
```

**Parameters:**
- `repeaterName`: The name of the repeater field
- `fieldName`: The name of the field within the repeater
- `operation` (optional): The operation to perform on the values, defaults to 'sum'
  - `sum`: Calculates the total sum of all field values
  - `avg`: Calculates the average (mean) of all field values
  - `min`: Returns the smallest value among all field values
  - `max`: Returns the largest value among all field values
  - `count`: Returns the number of items in the repeater

**Examples:**
```
Total Items: #repeater_field(order_items, quantity, sum)
Average Price: $#repeater_field(order_items, price, avg)
Item Count: #repeater_field(order_items, quantity, count)
```

### Repeater Widget Data Token

**Syntax:**
```
#repeater(repeaterName, property)
```

**Parameters:**
- `repeaterName`: The name of the repeater widget
- `property`: The property to retrieve
  - `rows_count`: Returns the total number of rows in the repeater
  - `first_index`: Returns the index of the first row (always 1)
  - `last_index`: Returns the index of the last row (same as rows_count)

**Example:**
```
You have #repeater(order_items, rows_count) items in your order.
```

### Math Functions

All calculation tokens from the calculation system are also available in submit form contexts:

- `#math_round(number, [decimals])`: Round numbers to specified decimal places
- `#math_abs(number)`: Get absolute value
- `#math_min(number1, number2, ...)`: Get minimum value
- `#math_max(number1, number2, ...)`: Get maximum value

**Example:**
```
Final Total: $#math_round(#calc(#field(base_price) + #field(tax)), 2)
```

### Form Token

**Syntax:**
```
#form(all-fields)
```

**Description:** Returns all form fields and their values in a formatted list.

**Example:**
```
#form(all-fields)
```
This will output all form fields with their labels and values in a structured format.

### Site Tokens

These tokens provide information about your WordPress site.

#### Site Admin Email
**Syntax:**
```
#site(admin-email)
```
Returns the site administrator's email address.

#### Site URL
**Syntax:**
```
#site(url)
```
Returns the current site URL.

#### Site Name
**Syntax:**
```
#site(name)
```
Returns the site name (blog name).

#### Site Domain
**Syntax:**
```
#site(domain)
```
Returns the site domain name.

**Examples:**
```
From: #site(name) <#site(admin-email)>
Website: #site(url)
Domain: #site(domain)
```

### User Tokens

These tokens provide information about WordPress users.

#### User First Name
**Syntax:**
```
#user(id, first-name)
```
Returns the first name of the user with the specified ID.

#### User Last Name
**Syntax:**
```
#user(id, last-name)
```
Returns the last name of the user with the specified ID.

#### Current User First Name
**Syntax:**
```
#user(current, first-name)
```
Returns the first name of the currently logged-in user.

**Examples:**
```
Dear #user(current, first-name),
Thank you for your submission from #user(123, first-name) #user(123, last-name).
```

### Post Tokens

These tokens provide information about WordPress posts.

#### Current Post ID
**Syntax:**
```
#post(current)
```
Returns the ID of the current post/page where the form is located.

#### Post Title by ID
**Syntax:**
```
#post(id, title)
```
Returns the title of the post with the specified ID. Replace `id` with the actual post ID or a field value.

**Examples:**
```
Form submitted from post #post(current)
Post Title: #post(123, title)
Dynamic Post: #post(#field(post_id), title)
```

## Common Use Cases

### Email Notifications

```
Subject: New Order from #field(customer_name)

Dear #field(customer_name),

Thank you for your order! Here are the details:

Order Summary:
- Base Price: $#field(base_price)
- Tax: $#field(tax)
- Total: $#calc(#field(base_price) + #field(tax))

Items Ordered:
#repeater_field(order_items, item_name, count) items

Form submitted from: #site(name) (#site(url))
Page: #post(current)

We will process your order shortly.

Best regards,
The #site(name) Team
```

### Confirmation Messages

```
Thank you, #field(first_name)!

Your order for $#calc(#field(base_price) + #field(tax)) has been received.
Order ID: #field(order_id)
Submitted on: #site(name) at #site(url)
```

### Database Entries

```
INSERT INTO orders (customer_name, total_amount, item_count, site_name, submission_date) 
VALUES ('#field(customer_name)', #calc(#field(base_price) + #field(tax)), #repeater_field(order_items, quantity, sum), '#site(name)', NOW())
```

### Dynamic Email Headers

```
From: #site(name) <#site(admin-email)>
Reply-To: #field(customer_email)
Subject: Order Confirmation - #field(order_id) from #site(name)
```

### User-Specific Content

```
Dear #user(current, first-name),

Thank you for submitting the form on #site(name). 
Your submission has been received and will be processed by our team.

Best regards,
#site(name) Support Team
```

## Advanced Token Combinations

### Conditional Content Based on User Status

```
#user(current, first-name) has submitted a form from #site(name).

#field(user_type, label): #field(user_type, calculated_value)
Total Items: #repeater_field(order_items, quantity, sum)
Average Price: $#math_round(#repeater_field(order_items, price, avg), 2)
```

### Multi-Site Form Processing

```
Form Submission Details:
- Site: #site(name) (#site(domain))
- URL: #site(url)
- Post: #post(current)
- User: #user(current, first-name)
- Submission Time: [Current timestamp]

Form Data:
#form(all-fields)
```

## Important Notes

1. **Data Availability**: All form data is available in submit form tokens, including calculated values
2. **Performance**: Submit form tokens are processed once during form submission
3. **Error Handling**: Invalid tokens will be replaced with empty strings in the final output
4. **Security**: Always validate and sanitize token outputs when displaying user-generated content
5. **User Context**: User tokens require appropriate user permissions and may return empty values for non-logged-in users
6. **Site Information**: Site tokens always return current site information regardless of form context

## Troubleshooting

### Common Issues

- **Empty Values**: Check that field names match exactly (case-sensitive)
- **Calculation Errors**: Ensure mathematical expressions use valid operators and numbers
- **Repeater Issues**: Verify repeater field names and structure match your form setup
- **Math Function Errors**: Check that all parameters are valid numbers
- **User Token Issues**: Verify user permissions and that users are logged in when required
- **Site Token Issues**: Ensure WordPress site settings are properly configured

### Field Type Compatibility

**Text Fields** (text, email, phone, number, hidden, textarea):
- `value`: ✅ Returns the field's submitted value
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

### Token Processing Order

1. **Field Tokens**: Processed first to get form data
2. **Calculation Tokens**: Processed after field tokens are resolved
3. **Math Functions**: Applied to calculation results
4. **System Tokens**: Site, user, and post tokens processed last
5. **Form Token**: Processes all field data into formatted output

### Best Practices

1. **Test Tokens**: Always test your token combinations in a development environment
2. **Fallback Values**: Consider what happens when tokens return empty values
3. **Performance**: Avoid overly complex nested token expressions
4. **Security**: Sanitize any user-generated content that will be displayed
5. **Documentation**: Keep track of custom token combinations for future reference

