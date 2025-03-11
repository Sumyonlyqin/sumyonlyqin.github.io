function adjustImageRounding() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const img = product.querySelector('img');
        const productHeight = product.clientHeight;
        const imgHeight = img.clientHeight;
        const isMobile = window.innerWidth <= 860;

        if (isMobile) {
            img.classList.add('rounded-mobile');
        } else {
            img.classList.remove('rounded-mobile');
        }

        if (imgHeight < productHeight && !isMobile) {
            img.classList.add('rounded-bottom-right');
        } else {
            img.classList.remove('rounded-bottom-right');
        }
    });
}

window.addEventListener('resize', adjustImageRounding);
window.addEventListener('load', adjustImageRounding);

async function loadChangelog(assetType, divId) {
  const response = await fetch('https://sumyonlyqin.github.io/webConfig.json');
  const data = await response.json();
  const asset = data.assets.find(asset => asset.assetType === assetType);

  if (asset) {
    const changelogContainer = document.querySelector(`#${divId} .changelog-content`);
    changelogContainer.innerHTML = '';

    asset.versions.slice().reverse().forEach(version => {
      const entry = document.createElement('div');
      entry.classList.add('changelog-entry', `v${version.versionType}`);
      entry.innerHTML = `
        <p><strong>Version ${version.version}</strong> (${version.releaseDate})</p>
        <p>${version.description ? version.description.replace(/\n/g, '<br>') : ''}</p>
      `;
      changelogContainer.appendChild(entry);
    });

    document.getElementById(divId).classList.remove('hidden');
  }
}

function toggleChangelog(assetType, divId) {
  const changelog = document.getElementById(divId);
  const button = changelog.previousElementSibling.querySelector('.changelog-button');
  const closeIcon = button.querySelector('.close-changelog');

  changelog.classList.toggle('hidden');
  button.classList.toggle('open');

  if (!changelog.classList.contains('hidden')) {
    loadChangelog(assetType, divId);
  }
  adjustImageRounding();
}