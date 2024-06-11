# SqValidatorHelper

A utility class for validating various data types.

## Description

`SqValidatorHelper` is a utility class that provides methods for validating data such as names, emails, dates, URLs, CPFs, CNPJs, and more.

## Methods

### `email(email: string): boolean`

Validates an email address.

- `email`: The email address to validate.
- Returns: `true` if the email address is valid, `false` otherwise.

### `url(url: string): boolean`

Validates a URL.

- `url`: The URL to validate.
- Returns: `true` if the URL is valid, `false` otherwise.

### `date(date: string): boolean`

Validates a date string.

- `date`: The date string to validate.
- Returns: `true` if the date string is valid, `false` otherwise.

### `cnpj(value: string): boolean`

Validates a CNPJ (Brazilian company registration number).

- `value`: The CNPJ to validate.
- Returns: `true` if the CNPJ is valid, `false` otherwise.

### `phone(phone: string): boolean`

Validates a phone number.

- `phone`: The phone number to validate.
- Returns: `true` if the phone number is valid, `false` otherwise.

### `cpf(value: string): boolean`

Validates a CPF (Brazilian individual taxpayer registry number).

- `value`: The CPF to validate.
- Returns: `true` if the CPF is valid, `false` otherwise.

### `recordEmployment(recordEmployment: string): boolean`

Validates a record of employment number.

- `recordEmployment`: The record of employment number to validate.
- Returns: `true` if the record of employment number is valid, `false` otherwise.


## Example Usage

```typescript
import { SqValidatorHelper } from '@squidit/vue-css'

// Create an instance of SqValidatorHelper
const sqValidatorHelper = new SqValidatorHelper()

// Validate if a string is a valid email address
const isValidEmail = sqValidatorHelper.email('example@example.com')
console.log('Is valid email:', isValidEmail)

// Validate if a string is a valid url
const isValidUrl = sqValidatorHelper.url('https://vue-css.squidit.com.br/')
console.log('Is valid url:', isValidUrl)

// Validate if a string is a valid date
const isValidDate = sqValidatorHelper.date('07/06/2024')
console.log('Is valid date:', isValidDate)

// Validate if a string is a valid cnpj
const isValidCnpj = sqValidatorHelper.cnpj('67.476.187/0001-75')
console.log('Is valid cnpj:', isValidCnpj)

// Validate if a string is a valid phonr
const isValidPhone = sqValidatorHelper.phone('(48) 3704-4211')
console.log('Is valid phone:', isValidPhone)

// Validate if a string is a valid cpf
const isValidCpf = sqValidatorHelper.cpf('486.942.140-24')
console.log('Is valid cpf:', isValidCpf)

// Validate if a string is a valid record employment
const isValidRecordEmployment = sqValidatorHelper.recordEmployment('082.87827.09-2')
console.log('Is valid record employment:', isValidRecordEmployment)
```
