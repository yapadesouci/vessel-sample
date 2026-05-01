# vessel-sample

A sample [Vessel](https://github.com/your-org/vessel) cargo demonstrating all four host APIs: storage, network, notifications, and clipboard.

## Structure

```
vessel-sample/
  manifest.json          ← cargo descriptor
  sdk/
    index.js             ← bundled @vessel/sdk
  apps/
    storage-test/        ← persistent counter (storage API)
    network-test/        ← dad joke fetcher (network/http API)
    notif-test/          ← system notification (notifications API)
    clipboard-test/      ← clipboard write (clipboard API)
  scripts/
    pack.js              ← packaging script
```

## Apps

| App | Permission | What it does |
|-----|-----------|--------------|
| Storage Test | `storage` | Counter that persists across reloads |
| Network Test | `network` | Fetches a random dad joke via `http.fetch` |
| Notifications Test | `notifications` | Sends a native system notification |
| Clipboard Test | `clipboard` | Writes a string to the system clipboard |

## Build

Requires Node.js 18+.

```bash
node scripts/pack.js
# or
npm run build
```

Produces `dist/sample-dist.zip` — a ready-to-install Vessel cargo.

## Install in Vessel

Drag and drop `dist/sample-dist.zip` onto the Vessel app, or use **File → Install Cargo**.

## Developing your own cargo

1. Clone this repo as a starting point.
2. Edit `manifest.json` — change `id`, `name`, `author`, and the `apps` array.
3. Add your app HTML files under `apps/{appId}/index.html`.
4. Import from `../../sdk/index.js` and call `await ready()` before using any API.
5. Run `npm run build` to produce the distributable zip.

### SDK quick reference

```js
import { ready, storage, notifications, clipboard, http } from '../../sdk/index.js'

await ready() // must be called first

// Storage (key/value, persisted per app)
const value = await storage.get('key')
await storage.set('key', value)

// Notifications
await notifications.send({ title: 'Title', body: 'Body text' })

// Clipboard
await clipboard.write('text to copy')

// HTTP (proxied through Vessel host)
const res = await http.fetch('https://example.com', { headers: { Accept: 'application/json' } })
const data = JSON.parse(res.body)
```

Each API must be declared in the app's `permissions` array in `manifest.json`.
