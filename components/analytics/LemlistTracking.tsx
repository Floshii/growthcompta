import Script from 'next/script'

export default function LemlistTracking() {
  return (
    <Script
      id="lemlist-tracking"
      strategy="afterInteractive"
      src="https://app.lemlist.com/api/visitors/tracking?k=VGmRbEMf4p0yYkF5%2Bkx9%2F8C4cK3P9ry8T8joaVOT50U%3D&t=tea_j2Nbcnh7X9wRpEei5"
    />
  )
}
