# Profile Update and Feedback Forms

A React application demonstrating form handling concepts with controlled and uncontrolled components.

## Features

### Profile Update Form (Controlled Components)
- **Fields**: name, email, age, gender
- **Validation**: 
  - Name and email are required
  - Email must be valid format
  - Age must be greater than 12
- **State Management**: Uses React state with controlled inputs

### Feedback Form (Uncontrolled Components)
- **Fields**: rating (1-5), feedback message
- **Validation**:
  - Rating must be between 1 and 5
  - Feedback message is required
- **Implementation**: Uses useRef for uncontrolled inputs

### Summary Component
- Displays submitted data from both forms
- Receives data as props from parent component
- Shows profile and feedback information separately

## Key Implementation Details

1. **Controlled Components**: Profile form uses `value` and `onChange` props
2. **Uncontrolled Components**: Feedback form uses `useRef` to access DOM values
3. **Validation**: Inline error messages with real-time clearing
4. **State Management**: Parent component maintains shared state
5. **Props**: Summary component receives data via props

## Running the Application

```bash
npm install
npm start
```

## Running Tests

```bash
npm test
```

## Test Coverage

- ✅ Form rendering and basic functionality
- ✅ Controlled component behavior (Profile Form)
- ✅ Uncontrolled component behavior (Feedback Form)
- ✅ Validation for all required fields
- ✅ Email format validation
- ✅ Age and rating range validation
- ✅ Error handling and clearing
- ✅ Successful form submissions
- ✅ Summary component display
- ✅ Integration between forms and summary
- ✅ State and props management

All 15 test cases pass successfully, covering the complete requirements.