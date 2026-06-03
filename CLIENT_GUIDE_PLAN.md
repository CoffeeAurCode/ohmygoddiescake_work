# Client Guide — HTML File Plan

**Audience:** Onyinye Ekwulugo (bakery owner, non-technical)  
**Purpose:** Step-by-step visual guide on how to manage incoming cake orders from the website  
**Output file:** `client-guide.html` — single self-contained HTML file, no server needed, open in any browser  
**Tone:** Friendly, plain English, no tech jargon

---

## File Spec

- Single `.html` file — open directly in Chrome/Safari/Edge, no install needed
- Embedded CSS (no external dependencies)
- Embedded base64 screenshots OR placeholder boxes with captions
- Printable — clean print stylesheet so Ony can keep a paper copy
- Color scheme matches Ony's brand: warm cream/rose-gold palette

---

## Structure Overview

```
client-guide.html
├── Header — "How to Manage Orders — Ony's Boutique"
├── Section 0 — How the System Works (1-page overview diagram)
├── Section 1 — The SMS You Receive
├── Section 2 — Finding Your Orders in Square
├── Section 3 — Reading an Order's Details
├── Section 4 — Managing Your Calendar
├── Section 5 — Your Customer List
├── Section 6 — Cancelling or Rescheduling a Booking
└── Section 7 — Troubleshooting
```

---

## Section 0 — How the System Works

**Content:**  
A simple left-to-right flow diagram (HTML/CSS, no images needed):

```
[Customer fills form on website]
        ↓
[You get an SMS on your phone]
        ↓
[Booking appears in Square Calendar]
        ↓
[Customer record saved in Square Customers]
```

**Text:** Short paragraph explaining: "When someone submits an order on your website, two things happen automatically: you get a text message with a summary, and the order is added to your Square Appointments calendar. You don't need to do anything — it's all automatic."

---

## Section 1 — The SMS You Receive

**Content:**  
A styled "phone mockup" (pure CSS box styled to look like an iPhone message bubble) showing an example SMS:

```
NEW ORDER - Ony's Boutique
From: Jane Smith (587-555-1234)
Date: 2026-07-15 | Pickup
Occasion: Birthday
Cake: Chocolate, Buttercream, 24 servings
Add-ons: freshFlorals, disco
```

**Screenshot needed:** `[SCREENSHOT 1]` — Real SMS received on your phone showing an order notification. Take this after a test order is submitted through the website.

**Labels explaining each line:**
- **From** — customer name and phone number (tap to call or text back)
- **Date** — the pickup or delivery date they chose
- **Occasion** — what the cake is for
- **Cake** — flavor, frosting, servings
- **Add-ons** — extras they selected

**Tip box:** "You don't need to reply to the SMS. It's just a heads-up. The full details are in your Square calendar."

---

## Section 2 — Finding Your Orders in Square

**Content:** Step-by-step numbered instructions with screenshot placeholders

### Step 2a — Open Square Appointments
**Text:** "On your phone or computer, open the Square app or go to squareup.com and sign in."

`[SCREENSHOT 2]` — Square Dashboard home screen showing the main menu

### Step 2b — Go to Appointments
**Text:** "Tap or click **Appointments** in the left menu."

`[SCREENSHOT 3]` — Left nav with "Appointments" highlighted

### Step 2c — Find the date
**Text:** "Use the calendar at the top to navigate to the date the customer chose for pickup or delivery. New orders appear as appointment blocks on that date."

`[SCREENSHOT 4]` — Appointments calendar view showing a booking block on a date

**Tip box:** "All orders are set to **12:00 PM** on the pickup/delivery date. This is just how they're stored — it doesn't mean the customer is coming at noon."

---

## Section 3 — Reading an Order's Details

**Content:**

### Step 3a — Click the appointment
**Text:** "Tap or click the appointment block to open it."

`[SCREENSHOT 5]` — Appointment detail popup showing the customer name and "CAKE ORDER - Ony's Boutique" at the top of the notes

### Step 3b — Read the notes
**Text:** "All order details are in the **Notes** field. Here's what each line means:"

**Annotated mockup** (styled HTML box, not a real screenshot — shows the note format with color-coded labels):

```
┌─────────────────────────────────────────────────┐
│ CAKE ORDER - Ony's Boutique                      │
│ ---                                              │
│ Occasion: Birthday           ← what it's for    │
│ Occasion notes: 50th bday    ← their extra note  │
│ Servings: 24                 ← how many people   │
│ Cake: Chocolate + Buttercream frosting           │
│ Add-ons: Fresh florals, Disco balls              │
│ Fulfillment: Pickup          ← pickup or deliver  │
│ ---                                              │
│ Customer: Jane Smith         ← full name         │
│ Email: jane@example.com      ← for follow-up     │
│ Phone: 587-555-1234          ← tap to call       │
└─────────────────────────────────────────────────┘
```

`[SCREENSHOT 6]` — Real appointment notes panel in Square Dashboard showing a live order

---

## Section 4 — Managing Your Calendar

**Content:**

### 4a — Week vs Day view
**Text:** "Switch between **Day**, **Week**, and **Month** view using the buttons at the top right of Appointments."

`[SCREENSHOT 7]` — Calendar with Day/Week/Month toggle highlighted

### 4b — What a busy week looks like
**Text:** "During busy periods you'll see multiple bookings stacked on different dates. Each block shows the customer name."

`[SCREENSHOT 8]` — Week view showing several bookings across different days

### 4c — Colour and status
**Text:** "Square shows bookings in different colours based on status: upcoming bookings are shown in your brand colour; past bookings are grey."

---

## Section 5 — Your Customer List

**Content:**

### 5a — Where to find it
**Text:** "Every customer who orders through the website is automatically saved in **Square Customers**. You can find it in the left menu under **Customers**."

`[SCREENSHOT 9]` — Square Customers list showing customer names, emails, phone numbers

### 5b — What's saved
**Text:** "For each customer you'll see:"
- Full name
- Email address
- Phone number
- Their booking history

**Text:** "This builds up over time — after a few months you'll have a full list of everyone who has ever ordered from you."

### 5c — Finding a specific customer
**Text:** "Use the search bar at the top to find a customer by name, email, or phone."

`[SCREENSHOT 10]` — Customer search bar with a name typed in

---

## Section 6 — Cancelling or Rescheduling a Booking

**Content:**

### 6a — Cancelling
**Text:** "If a customer calls to cancel:"

1. Open **Appointments**
2. Find their booking date and click it
3. Click the **three dots (⋯)** menu in the top right of the appointment
4. Select **Cancel appointment**
5. Confirm

`[SCREENSHOT 11]` — Appointment detail with the ⋯ menu open showing "Cancel appointment"

**Important box:** "Cancelling in Square does NOT automatically notify the customer. You should call or text them separately to confirm."

### 6b — Rescheduling
**Text:** "If a customer wants a different date:"

1. Open the existing appointment
2. Click **Edit**
3. Change the date
4. Click **Save**

`[SCREENSHOT 12]` — Appointment edit screen with the date field highlighted

**Tip box:** "Or: cancel the old one and they can submit a new order through the website with the correct date."

---

## Section 7 — Troubleshooting

**Content:** Simple two-column table

| Problem | What to do |
|---|---|
| I submitted an order but didn't get an SMS | Check your phone signal. If signal is fine, contact your developer — the Twilio number may need to be checked. |
| The booking isn't showing on my calendar | Check the date — bookings always appear at 12:00 PM on the pickup/delivery date. Try switching to Week or Month view. |
| I see a booking but the notes are empty | This shouldn't happen. Contact your developer and give them the booking ID (visible in the appointment URL). |
| A customer submitted twice by accident | Find both bookings in Square Appointments, keep one, cancel the other. |
| I can't find the Appointments section | Make sure you're logged into the correct Square account (the one for Ony's Boutique Cakes). |
| The website form isn't working | Contact your developer. The Square or Twilio service may be temporarily down. |

---

## HTML Build Instructions

When building `client-guide.html`, follow these specs:

### Layout
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Management Guide — Ony's Boutique</title>
  <style>
    /* All CSS embedded here — no external files */
    /* Brand colors: --cream: #F3EDE4; --rose: #C9956A; --ink: #2A241E; */
    /* Font: system-ui fallback (no Google Fonts dependency) */
    /* Print: @media print { hide nav, collapse sections, show all content } */
  </style>
</head>
```

### Screenshot placeholders (before real screenshots are taken)
Each `[SCREENSHOT N]` becomes a styled placeholder box:
```html
<figure class="screenshot-placeholder">
  <div class="placeholder-box">
    📸 Screenshot N — [description]
    <small>Replace this box with an actual screenshot</small>
  </div>
  <figcaption>Caption text here</figcaption>
</figure>
```

### Taking the screenshots
Screenshots should be taken from:
- **Square Dashboard** (squareup.com, logged in as Ony's Boutique Cakes account)
- **Square mobile app** (iPhone) for the SMS and mobile calendar views

| Screenshot | Where to take it | Notes |
|---|---|---|
| 1 | Phone → Messages app | After submitting a test order through the website |
| 2 | squareup.com → Dashboard home | Show main left nav |
| 3 | Appointments tab | Left nav highlighted |
| 4 | Appointments → Calendar | Navigate to a date with a test booking |
| 5 | Click a test booking | Show the popup/detail panel |
| 6 | Appointment notes panel | The CAKE ORDER note block |
| 7 | Appointments top bar | Day/Week/Month toggle |
| 8 | Week view | If multiple test bookings exist |
| 9 | Customers list | After test orders created real customer records |
| 10 | Customers search | Type a test customer name |
| 11 | Appointment ⋯ menu | Open the cancel option |
| 12 | Appointment edit | Date field visible |

### After screenshots are taken
1. Crop screenshots to show only the relevant UI area
2. Save as `.png` at 1x resolution (not Retina — keeps file size small)
3. Convert to base64: `node -e "const fs=require('fs'); console.log(fs.readFileSync('screenshot.png').toString('base64'))"` 
4. Embed in HTML as `<img src="data:image/png;base64,..." alt="...">`
5. This keeps the guide as a single portable `.html` file

---

## Delivery Checklist

- [ ] Build `client-guide.html` with placeholder boxes
- [ ] Submit 3–4 test orders through the live website to populate real bookings and customer records
- [ ] Take all 12 screenshots from Square Dashboard
- [ ] Take Screenshot 1 (SMS) from actual phone
- [ ] Replace all placeholder boxes with real screenshots
- [ ] Test: open file in Chrome, Safari, Edge — confirm layout looks correct
- [ ] Test: Ctrl+P / print preview — confirm clean printable version
- [ ] Deliver file to Ony via email or WhatsApp
