/**
 * Performance Monitoring - Core Web Vitals Tracking
 * Measures LCP, FID, CLS and sends to analytics
 */

// Simple Web Vitals tracking without external dependencies
(function() {
  'use strict';

  // Store metrics
  const metrics = {};

  // Send metric to analytics (Plausible custom events)
  function sendMetric(name, value) {
    metrics[name] = value;

    // Log to console in development
    console.log(`[Performance] ${name}: ${value}`);

    // Send to Plausible Analytics if available
    if (window.plausible) {
      window.plausible('Web Vitals', {
        props: {
          metric: name,
          value: Math.round(value)
        }
      });
    }
  }

  // Largest Contentful Paint (LCP)
  function measureLCP() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      sendMetric('LCP', lastEntry.renderTime || lastEntry.loadTime);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // First Input Delay (FID)
  function measureFID() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        sendMetric('FID', entry.processingStart - entry.startTime);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  // Cumulative Layout Shift (CLS)
  function measureCLS() {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Report on page hide
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendMetric('CLS', clsValue);
      }
    });
  }

  // Time to First Byte (TTFB)
  function measureTTFB() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      sendMetric('TTFB', navigationEntry.responseStart - navigationEntry.requestStart);
    }
  }

  // Page Load Time
  function measurePageLoad() {
    addEventListener('load', () => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      sendMetric('Page Load', pageLoadTime);
    });
  }

  // Initialize all measurements
  function init() {
    measureLCP();
    measureFID();
    measureCLS();
    measureTTFB();
    measurePageLoad();
  }

  // Start monitoring when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
