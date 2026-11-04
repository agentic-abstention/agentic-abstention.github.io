'use strict';

(() => {
  const chart = document.getElementById('results-chart');
  const slider = document.getElementById('k-slider');
  const environmentButtons = [...document.querySelectorAll('[data-environment]')];
  let environment = 'web';

  function renderResults() {
    const dataset = window.ABSTENTION_RESULTS?.[environment];
    if (!dataset || !chart || !slider) return;
    const k = Number(slider.value);
    document.getElementById('k-readout').textContent = `K = ${k}`;
    document.getElementById('k-output').value = k;
    document.getElementById('timing-readout').textContent = k === 1 ? 'Strictly timely' : `Up to ${k - 1} extra ${k === 2 ? 'step' : 'steps'}`;
    document.getElementById('explorer-scope').textContent = dataset.scope;
    slider.setAttribute('aria-valuetext', `${k} decision opportunities; ${k === 1 ? 'strictly timely abstention' : `up to ${k - 1} steps of delay`}`);
    environmentButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.environment === environment)));
    chart.replaceChildren();
    dataset.series.forEach(series => {
      const value = series.values[k - 1] * 100;
      const row = document.createElement('div');
      row.className = 'result-row';
      const name = document.createElement('span');
      name.className = 'result-name';
      name.textContent = series.label;
      const graphic = document.createElement('div');
      graphic.className = 'result-graphic';
      const track = document.createElement('div');
      track.className = 'result-track';
      track.setAttribute('aria-hidden', 'true');
      const bar = document.createElement('span');
      bar.className = 'result-bar';
      bar.style.width = `${value}%`;
      track.append(bar);
      const label = document.createElement('span');
      label.className = 'result-percentage';
      label.textContent = `${value.toFixed(1)}%`;
      graphic.append(track, label);
      row.append(name, graphic);
      chart.append(row);
    });
    document.getElementById('chart-status').textContent = `${dataset.title}: showing AbsRec@${k} for ${dataset.series.length} ${environment === 'terminal' ? 'scaffolds' : 'models'}.`;
  }

  environmentButtons.forEach(button => button.addEventListener('click', () => {
    environment = button.dataset.environment;
    renderResults();
  }));
  slider?.addEventListener('input', renderResults);
  renderResults();

  document.getElementById('copy-citation')?.addEventListener('click', async () => {
    const citation = document.getElementById('bibtex');
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(citation.textContent.trim());
      status.textContent = 'Citation copied.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
    }
  });
})();
