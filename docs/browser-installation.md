# Browser Installation Guide

This project is currently built for **Chromium-based browsers** (Chrome, Edge, Brave, Opera, Vivaldi) using the `chrome.proxy` API.

## Before you start

1. Download or clone this repository.
2. Keep the folder path handy:
   - `/home/runner/work/VPN-Extension/VPN-Extension/src`
3. Make sure you have at least one real proxy endpoint configured after install (the defaults are placeholders and intentionally blocked).

## Google Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked**.
4. Select `/home/runner/work/VPN-Extension/VPN-Extension/src`.
5. Pin **VeilRoute Proxy** from the Extensions menu (optional, recommended).
6. Open the extension popup.
7. Click **Settings** and configure a real proxy host, port, scheme, and optional credentials.
8. Enable the proxy in the popup and pick a region.

## Microsoft Edge

1. Open `edge://extensions`.
2. Turn on **Developer mode** (left sidebar).
3. Click **Load unpacked**.
4. Select `/home/runner/work/VPN-Extension/VPN-Extension/src`.
5. Open the extension popup.
6. Configure real region gateway values in **Settings**.
7. Enable the proxy and select a region.

## Brave, Opera, Vivaldi (Chromium-based)

The flow is the same as Chrome/Edge:

1. Open your browser's extensions page.
2. Enable **Developer mode**.
3. Choose **Load unpacked**.
4. Select `/home/runner/work/VPN-Extension/VPN-Extension/src`.
5. Open VeilRoute settings and configure real proxy endpoints.
6. Enable the extension proxy mode from the popup.

## Firefox status

Firefox is **not supported by this repository in its current form**.

Why:
- The extension is implemented against Chromium APIs (`chrome.proxy`, Chromium-specific privacy behavior).
- Manifest and permission behavior differ in Firefox for proxy control.

If Firefox support is needed, a dedicated Firefox compatibility pass is required (API migration/testing and likely manifest adjustments).

## Quick verification after install

1. Open the extension popup and ensure status changes to enabled.
2. Use the built-in **IP check** button/flow.
3. Confirm the reported public IP matches your selected proxy region.
4. If it does not connect, verify host/port/credentials in Settings.
