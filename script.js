// script.js
const tabs = ['learn', 'brainstorm', 'write', 'feedback'];
const contents = {
    intro: '', body1: '', body2: '', body3: '', rec: ''
};

function switchTab(activeTab) {
    tabs.forEach(tab => {
        const tabElement = document.getElementById(`tab-${tab}`);
        const contentElement = document.getElementById(`content-${tab}`);
        if (tab === activeTab) {
            tabElement.classList.replace('tab-inactive', 'tab-active');
            contentElement.classList.remove('hidden');
        } else {
            tabElement.classList.replace('tab-active', 'tab-inactive');
            contentElement.classList.add('hidden');
        }
    });

    if (activeTab === 'write') {
        updateIdeaNote();
    }
}

function toggleAccordion(contentId) {
    const content = document.getElementById(contentId);
    const button = content.previousElementSibling;
    const icon = button.querySelector('span:last-child');
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = 'rotate(180deg)';
    }
}

document.getElementById('brainstorm-form').addEventListener('input', (e) => {
    if (e.target.tagName === 'TEXTAREA') {
        const id = e.target.id.replace('idea-', '');
        contents[id] = e.target.value;
    }
});

function updateIdeaNote() {
    const noteContainer = document.getElementById('idea-note');
    const placeName = document.getElementById('place-name').value || "정해지지 않은 장소";
    
    noteContainer.innerHTML = `<h4 class="font-bold mb-2">${placeName}</h4>`;
    
    const ideasToShow = [
        { label: '도입', content: contents.intro },
        { label: '장소 특징', content: contents.body1 },
        { label: '할 수 있는 활동', content: contents.body2 },
        { label: '특별한 경험', content: contents.body3 },
        { label: '추천', content: contents.rec }
    ];

    let hasContent = false;
    ideasToShow.forEach(idea => {
        if (idea.content) {
            hasContent = true;
            const p = document.createElement('p');
            p.innerHTML = `<strong class="text-stone-600">${idea.label}:</strong> ${idea.content.replace(/\n/g, '<br>')}`;
            noteContainer.appendChild(p);
        }
    });

    if (!hasContent) {
        noteContainer.innerHTML = `<p class="text-stone-500">2단계에서 아이디어를 작성하면 이곳에 표시됩니다.</p>`;
    }
}

function copyDraft() {
    const draftText = document.getElementById('draft-area').value;
    document.execCommand('copy'); // For clipboard functionality in iframes
    const message = document.getElementById('copy-message');
    message.classList.remove('hidden');
    setTimeout(() => {
        message.classList.add('hidden');
    }, 2000);
}

// Open the first accordion item by default
window.onload = () => {
     toggleAccordion('feynman-content');
}