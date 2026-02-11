# Campay Sandbox Testing Guide

## Test Numbers (Sandbox Only - Max 25 XAF)

Use these special test numbers to simulate payment flows without real transactions:

### MTN Mobile Money
- **Success Flow**: `237677777777`
  - Status: PENDING → SUCCESSFUL
  - Use this to test successful payment completion
  
- **Failed Flow**: `237677777770`
  - Status: PENDING → FAILED
  - Use this to test payment failure handling

### Orange Money
- **Success Flow**: `237699999999`
  - Status: PENDING → SUCCESSFUL
  - Use this to test successful payment completion
  
- **Failed Flow**: `237699999990`
  - Status: PENDING → FAILED
  - Use this to test payment failure handling

## Testing Steps

1. **Start the dev server** (already running ✅)
   ```bash
   bun run dev
   ```

2. **Navigate to checkout**
   - Go to http://localhost:3000
   - Add products to cart
   - Go to checkout

3. **Test Successful Payment**
   - Name: Test User
   - Phone: `677777777` (for MTN success)
   - Address: Douala
   - Amount: 25 XAF or less
   - Click "Pay"
   - **Expected**: Success screen with payment reference

4. **Test Failed Payment**
   - Use phone: `677777770` (for MTN failed)
   - **Expected**: Error screen with failure message

5. **Check Webhook Logs**
   - Open browser console or terminal
   - Look for `[Campay Webhook]` logs showing status updates

## Important Notes

- **Maximum Amount**: 25 XAF in sandbox mode
- **Real Numbers**: Don't use real phone numbers in sandbox
- **Webhook**: Currently logs to console (database integration in M3)
- **Production**: Change `CAMPAY_API_URL` to `https://www.campay.net/api` when ready

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| ER101 | Invalid phone format | Ensure 9 digits, no country code in input |
| ER201 | Amount > 25 XAF | Use 25 or less in sandbox |
| 401 Unauthorized | Wrong credentials | Check username/password in `.env.local` |
| Token expired | Cached token expired | Service auto-refreshes, retry payment |
