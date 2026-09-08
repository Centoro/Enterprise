(function () {
  'use strict';

  function unwrap(response) {
    return response && Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
  }

  function renderElement(element) {
    const content = escapeHtml(element.content || '');
    const style = Object.entries(element.style || {}).map(([key, value]) => `${key.replace(/[A-Z]/g, match => '-' + match.toLowerCase())}:${escapeHtml(value)}`).join(';');
    if (element.type === 'heading') return `<h2 style="${style}">${content}</h2>`;
    if (element.type === 'text') return `<p style="${style}">${content}</p>`;
    if (element.type === 'image' || element.type === 'fullwidth-image') return `<img src="${escapeHtml(element.src || element.image || element.content || '')}" alt="${content}" style="${style}">`;
    if (element.type === 'button') return `<a href="${escapeHtml(element.link || '#')}" style="${style}">${content}</a>`;
    if (element.type === 'divider') return '<hr>';
    if (element.type === 'spacer') return '<div style="height:48px"></div>';
    return `<div style="${style}">${content}</div>`;
  }

  function renderPage(page) {
    if (!page || !Array.isArray(page.sections)) return false;
    const host = document.querySelector('[data-website-builder-root]');
    if (!host) return false;
    host.innerHTML = page.sections.map(section => {
      const settings = section.settings || {};
      const style = `background:${settings.background || '#fff'};color:${settings.textColor || '#1a1a1a'};padding:${settings.padding || '40px 20px'};text-align:${settings.alignment || 'left'}`;
      return `<section style="${style}">${(section.elements || []).sort((a, b) => (a.order || 0) - (b.order || 0)).map(renderElement).join('')}</section>`;
    }).join('');
    return true;
  }

  async function loadPublishedPage() {
    if (!window.ApiService || !document.querySelector('[data-website-builder-root]')) return;
    try {
      const response = await window.ApiService.getMainWebsitePage();
      const page = unwrap(response);
      if (page && (page.isPublished || page.published)) renderPage(page);
    } catch (error) {
      console.warn('Published website content is unavailable:', error.message);
    }
  }

  window.CentoroWebsite = { loadPublishedPage, renderPage };
  document.addEventListener('DOMContentLoaded', function () {
    loadPublishedPage();
    if (window.ApiService && typeof window.ApiService.track === 'function') {
      window.ApiService.track('page_view', window.location.pathname).catch(() => {});
      document.addEventListener('click', function (event) {
        const link = event.target.closest('a');
        if (link && /\.(mp3|wav|ogg|mp4|zip|pdf)(\?|$)/i.test(link.href)) {
          window.ApiService.track('download', link.href).catch(() => {});
        }
      });
    }
  });
}());
