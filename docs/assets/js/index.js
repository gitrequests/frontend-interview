const onDomLoaded = () => {
    const form = document.getElementById('taskForm')
    const inputNodeList = getInputElementsFromForm(form)
    restoreProgressFromStorage(inputNodeList)
    handleTaskProgress()
    form.addEventListener('change', () => {
        saveProgressToStorage(inputNodeList)
        handleTaskProgress()
    })
}

/**
 * @param {Node} form
 * @return {NodeList}
 */
const getInputElementsFromForm = form => {
    return form.querySelectorAll('input[type="checkbox"]')
}

/**
 * @param {NodeList} inputNodeList 
 */
const saveProgressToStorage = inputNodeList => {
    const progressData = [].map.call(inputNodeList, node => node.checked)
    localStorage.setItem('progress', JSON.stringify(progressData))
}

/**
 * @param {NodeList} inputNodeList 
 */
const restoreProgressFromStorage = inputNodeList => {
    const progressData = JSON.parse(localStorage.getItem('progress')) || []
    if (progressData.length === inputNodeList.length) {
        progressData.forEach((isChecked, id) => {
            inputNodeList[id].checked = isChecked
        })
    }
}

/**
 * Displays a message if the process is complete
 */
const handleTaskProgress = () => {
    const progressData = JSON.parse(localStorage.getItem('progress')) || []
    const progress = progressData.filter(bool => bool)
    document.getElementById('taskDone').textContent = progressData.length === progress.length ? 'Готово? Чего же вы ждёте? Скорее отправляйте нам результат! Удачи:)' : ''
}

document.addEventListener('DOMContentLoaded', onDomLoaded)