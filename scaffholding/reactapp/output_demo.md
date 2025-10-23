# Application Output Demo

## Initial State
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Profile Update and Feedback Forms                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│    Profile Update Form          │  │    Feedback Form                │
│         (Controlled)            │  │    (Uncontrolled)               │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│ Name: [________________]        │  │ Rating (1-5): [Select Rating ▼] │
│                                 │  │                                 │
│ Email: [________________]       │  │ Feedback Message:               │
│                                 │  │ ┌─────────────────────────────┐ │
│ Age: [________________]         │  │ │                             │ │
│                                 │  │ │                             │ │
│ Gender: [Select Gender ▼]       │  │ │                             │ │
│                                 │  │ │                             │ │
│ [Update Profile]                │  │ └─────────────────────────────┘ │
│                                 │  │                                 │
└─────────────────────────────────┘  │ [Submit Feedback]               │
                                     └─────────────────────────────────┘
```

## With Validation Errors
```
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│    Profile Update Form          │  │    Feedback Form                │
│         (Controlled)            │  │    (Uncontrolled)               │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│ Name: [________________]        │  │ Rating (1-5): [Select Rating ▼] │
│ ❌ Name is required             │  │ ❌ Rating must be between 1 and 5│
│                                 │  │                                 │
│ Email: [invalid-email____]      │  │ Feedback Message:               │
│ ❌ Email is invalid             │  │ ┌─────────────────────────────┐ │
│                                 │  │ │                             │ │
│ Age: [10_______________]        │  │ │                             │ │
│ ❌ Age must be greater than 12  │  │ │                             │ │
│                                 │  │ │                             │ │
│ Gender: [Select Gender ▼]       │  │ └─────────────────────────────┘ │
│                                 │  │ ❌ Feedback message is required │
│ [Update Profile]                │  │                                 │
│                                 │  │ [Submit Feedback]               │
└─────────────────────────────────┘  └─────────────────────────────────┘
```

## Filled Forms with Summary
```
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│    Profile Update Form          │  │    Feedback Form                │
│         (Controlled)            │  │    (Uncontrolled)               │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│ Name: [John Doe__________]      │  │ Rating (1-5): [5 ▼]             │
│                                 │  │                                 │
│ Email: [john@example.com_]      │  │ Feedback Message:               │
│                                 │  │ ┌─────────────────────────────┐ │
│ Age: [25_______________]        │  │ │ Excellent service and user  │ │
│                                 │  │ │ experience! The forms work  │ │
│ Gender: [Male ▼]                │  │ │ perfectly with validation.  │ │
│                                 │  │ │                             │ │
│ [Update Profile]                │  │ └─────────────────────────────┘ │
│                                 │  │                                 │
└─────────────────────────────────┘  │ [Submit Feedback]               │
                                     └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                  Summary                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                            Profile Information                              │
│ Name: John Doe                                                              │
│ Email: john@example.com                                                     │
│ Age: 25                                                                     │
│ Gender: male                                                                │
│                                                                             │
│                           Feedback Information                              │
│ Rating: 5/5                                                                 │
│ Message: Excellent service and user experience! The forms work perfectly   │
│          with validation.                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Success Messages
When forms are submitted successfully:
- Profile Form: "Profile updated successfully!" (alert)
- Feedback Form: "Feedback submitted successfully!" (alert)