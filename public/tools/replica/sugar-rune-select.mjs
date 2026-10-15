// Imported from REA; edit the importer and English map, then re-import.
// Image options use the existing select values and change events as their data model.
export function createIconSelects(renderOption, {selector = '#rune-tool select:not(#rune-rarity)', listId = 'rune-icon-options', root = document.body, signal} = {}) {
  const controls = new Map();
  let current = null;
  let visible = [];
  let active = -1;
  let positionFrame = 0;
  const shade = document.createElement('div');
  shade.className = 'r-picker-shade';
  shade.hidden = true;
  const menu = document.createElement('div');
  menu.className = 'r-picker-menu';
  menu.hidden = true;
  menu.innerHTML = "<div class=\"r-picker-head\"><strong></strong><button type=\"button\" aria-label=\"Close options\">×</button></div><input class=\"r-picker-search\" type=\"search\" aria-label=\"Search options\" placeholder=\"Search name, rarity or value…\" autocomplete=\"off\"><div id=\"rune-icon-options\" class=\"r-picker-options\" role=\"listbox\"></div><p class=\"r-picker-empty\" hidden>No matching options</p>";
  root.append(shade, menu);
  const title = menu.querySelector('strong');
  const search = menu.querySelector('input');
  const list = menu.querySelector('[role=listbox]');
  list.id = listId;
  const empty = menu.querySelector('.r-picker-empty');

  function items(select) {
    return [...select.options].map(option => ({
      value: option.value,
      label: option.textContent.trim(),
      group: option.parentElement.tagName === 'OPTGROUP' ? option.parentElement.label : '',
      disabled: option.disabled || option.parentElement.disabled,
      ...renderOption(select, option)
    }));
  }

  function syncButton(control) {
    const option = control.select.selectedOptions[0];
    control.button.disabled = control.select.disabled || !option;
    if (!option) return;
    const item = renderOption(control.select, option);
    const markup = item.html;
    if (control.markup !== markup) {
      control.button.innerHTML = '<span class="r-picker-value">' + markup + '</span><span class="r-picker-chevron" aria-hidden="true">⌄</span>';
      control.markup = markup;
    }
    control.button.setAttribute('aria-label', control.label + ": " + option.textContent.trim());
  }

  function close(restore = false) {
    const id = current?.select.id;
    current?.button.setAttribute('aria-expanded', 'false');
    current = null;
    menu.hidden = shade.hidden = true;
    if (restore && id) controls.get(id)?.button.focus({preventScroll: true});
  }

  function position() {
    if (!current || menu.hidden) return;
    const rect = current.button.getBoundingClientRect();
    const viewWidth = document.documentElement.clientWidth;
    const viewHeight = visualViewport?.height || innerHeight;
    const viewTop = visualViewport?.offsetTop || 0;
    const mobile = viewWidth <= 600;
    const width = mobile ? viewWidth - 24 : Math.min(Math.max(370, rect.width), viewWidth - 24);
    const above = Math.max(0, rect.top - viewTop - 12);
    const below = Math.max(0, viewTop + viewHeight - rect.bottom - 12);
    const useBelow = below >= 260 || below >= above;
    const limit = mobile ? Math.min(520, viewHeight - 24) : Math.min(480, Math.max(160, useBelow ? below : above));
    menu.style.width = width + 'px';
    menu.style.maxHeight = limit + 'px';
    list.style.maxHeight = Math.max(70, limit - (search.hidden ? 62 : 110)) + 'px';
    menu.style.left = (mobile ? 12 : Math.max(12, Math.min(rect.left, viewWidth - width - 12))) + 'px';
    if (mobile) {
      menu.style.bottom = 'auto';
      menu.style.top = Math.max(viewTop + 12, viewTop + viewHeight - menu.offsetHeight - 12) + 'px';
    } else {
      menu.style.bottom = 'auto';
      menu.style.top = Math.max(viewTop + 12, useBelow ? rect.bottom + 5 : rect.top - menu.offsetHeight - 5) + 'px';
    }
  }

  function setActive(index, focus = false) {
    active = visible.length ? Math.max(0, Math.min(index, visible.length - 1)) : -1;
    list.querySelectorAll('[role=option]').forEach((button, i) => {
      button.classList.toggle('active', i === active);
      if (i === active) {
        button.scrollIntoView({block: 'nearest'});
        if (focus) button.focus({preventScroll: true});
      }
    });
  }

  function choose(item) {
    if (!current || item.disabled) return;
    const select = current.select;
    const id = select.id;
    close();
    select.value = item.value;
    select.dispatchEvent(new Event('change', {bubbles: true}));
    sync();
    // Slot changes rebuild their select and trigger; focus the replacement.
    controls.get(id)?.button.focus({preventScroll: true});
  }

  function draw() {
    if (!current) return;
    const query = search.value.trim().toLocaleLowerCase();
    visible = items(current.select).filter(item => !item.disabled && (!query || (item.label + ' ' + (item.search || '')).toLocaleLowerCase().includes(query)));
    list.replaceChildren();
    let previousGroup = '';
    visible.forEach((item, index) => {
      if (item.group && item.group !== previousGroup) {
        const heading = document.createElement('div');
        heading.className = 'r-picker-group';
        heading.setAttribute('role', 'presentation');
        heading.textContent = item.group;
        list.append(heading);
      }
      previousGroup = item.group;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'r-picker-option';
      button.setAttribute('role', 'option');
      button.setAttribute('aria-label', item.label);
      button.setAttribute('aria-selected', String(item.value === current.select.value));
      button.tabIndex = -1;
      button.dataset.optionValue = item.value;
      button.innerHTML = item.html + '<span class="r-picker-check" aria-hidden="true">✓</span>';
      button.addEventListener('click', () => choose(item),{signal});
      button.addEventListener('pointermove', () => {
        active = index;
        list.querySelectorAll('.active').forEach(node => node.classList.remove('active'));
        button.classList.add('active');
      },{signal});
      list.append(button);
    });
    empty.hidden = Boolean(visible.length);
    list.hidden = !visible.length;
    active = Math.max(0, visible.findIndex(item => item.value === current.select.value));
    position();
    setActive(active);
  }

  function open(control, key) {
    if (control.button.disabled) return;
    close();
    current = control;
    control.button.setAttribute('aria-expanded', 'true');
    title.textContent = control.label;
    list.setAttribute('aria-label', control.label);
    search.hidden = control.select.options.length < 15;
    search.value = '';
    menu.hidden = shade.hidden = false;
    draw();
    if (key === 'ArrowDown' || key === 'ArrowUp') setActive(active, true);
    else if (!search.hidden) search.focus({preventScroll: true});
    else setActive(active, true);
  }

  function sync() {
    for (const [id, control] of controls) {
      if (!control.select.isConnected) {
        if (current === control) close();
        control.button.remove();
        controls.delete(id);
      }
    }
    root.querySelectorAll(selector).forEach(select => {
      let control = controls.get(select.id);
      if (!control) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'r-picker-trigger';
        button.id = select.id + '-picker';
        button.dataset.iconSelect = select.id;
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', list.id);
        select.hidden = true;
        select.after(button);
        control = {select, button, label: select.getAttribute('aria-label') || "Choose an option"};
        controls.set(select.id, control);
        const ownedControl = control;
        button.addEventListener('click', event => {
          event.preventDefault();
          current === ownedControl ? close(true) : open(ownedControl);
        },{signal});
        button.addEventListener('focus', () => select.dispatchEvent(new Event('focus')),{signal});
        button.addEventListener('keydown', event => {
          if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            open(ownedControl, event.key);
          }
        },{signal});
        select.addEventListener('change', () => {
          const replacement = controls.get(select.id);
          if (replacement) syncButton(replacement);
        },{signal});
      }
      syncButton(control);
    });
    if (current && !current.select.isConnected) close();
  }

  menu.querySelector('.r-picker-head button').addEventListener('click', () => close(true),{signal});
  shade.addEventListener('pointerdown', () => close(true),{signal});
  search.addEventListener('input', draw,{signal});
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    else if (event.key === 'Tab') close(true);
    else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      setActive(event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1 : active + (event.key === 'ArrowDown' ? 1 : -1), true);
    } else if (event.key === 'Enter' && event.target === search) {
      event.preventDefault();
      if (visible[active]) choose(visible[active]);
    }
  },{signal});
  addEventListener('resize', position, {signal});
  visualViewport?.addEventListener('resize', position, {signal});
  visualViewport?.addEventListener('scroll', position, {signal});
  addEventListener('scroll', event => {
    if (!current || menu.contains(event.target)) return;
    cancelAnimationFrame(positionFrame);
    positionFrame = requestAnimationFrame(position);
  }, {capture:true, signal});
  return {destroy(){cancelAnimationFrame(positionFrame);close();shade.remove();menu.remove();for(const c of controls.values()){c.select.hidden=false;c.button.remove();}controls.clear();}, sync, button: select => controls.get(select?.id)?.button};
}
