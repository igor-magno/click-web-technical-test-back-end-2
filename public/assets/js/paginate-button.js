const elementMoviesGrid = document.getElementById('movies-grid')
const elementPaginateButtonsGroup = document.querySelectorAll('.paginate-buttons-group')
let isLoading = false
let previousPage = null
let currentPage = null
let nextPage = null

function addLoading() {
    elementMoviesGrid.innerHTML = ''
    const loadingContainer = document.createElement('div')
    loadingContainer.classList.add('loading-card')
    loadingContainer.classList.add('col-span-full')
    loadingContainer.classList.add('w-full')
    loadingContainer.classList.add('h-full')
    loadingContainer.classList.add('flex')
    loadingContainer.classList.add('justify-center')
    loadingContainer.classList.add('items-center')
    loadingContainer.classList.add('p-12')
    loadingContainer.innerHTML = `
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Carregando...</span>
            </div>
        `
    elementMoviesGrid.appendChild(loadingContainer)
}

function removeLoading() {
    elementMoviesGrid.querySelectorAll('.loading-card').forEach(e => e.remove())
}


function showPaginaste() {
    elementPaginateButtonsGroup.forEach(e => {

        e.innerHTML = ''
        buttonsHtmlString = ''
        if (previousPage != null) {
            buttonsHtmlString += `
        <button type="button" onclick="loadMoviesContent('${previousPage}')" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        < </button>
    `
        } else {
            buttonsHtmlString += `
        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        < </button>
    `
        }

        if (currentPage != null) {
            buttonsHtmlString += `
        <div class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        ${currentPage}</div>
    `
        } else {
            buttonsHtmlString += `
        <div class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        </div>
    `
        }

        if (nextPage != null) {
            buttonsHtmlString += `
        <button type="button" onclick="loadMoviesContent('${nextPage}')" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        > </button>
    `
        } else {
            buttonsHtmlString += `
        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        > </button>
        `
        }
        e.innerHTML = buttonsHtmlString
        e.classList.remove('hidden')
    })
}

function loadMoviesContent(page = null) {
    if (isLoading) return
    isLoading = true;
    addLoading();
    fetch("movie?page=" + (page != null ? page : ''))
        .then(response => {
            return response.json()
        })
        .then(response => {
            previousPage = response.previousPage
            currentPage = response.currentPage
            nextPage = response.nextPage
            showPaginaste()
            response.movies.forEach(movie => {
                const movieCard = document.createElement('div')
                movieCard.classList.add('max-w-sm')
                movieCard.classList.add('bg-white')
                movieCard.classList.add('border')
                movieCard.classList.add('border-gray-200')
                movieCard.classList.add('rounded-lg')
                movieCard.classList.add('shadow')
                movieCard.classList.add('dark:bg-gray-800')
                movieCard.classList.add('dark:border-gray-700')
                const movieCoverDiv = document.createElement('div')
                movieCoverDiv.classList.add('w-full')
                movieCoverDiv.classList.add('h-64')
                movieCoverDiv.classList.add('rounded-t-lg')
                movieCoverDiv.classList.add('flex')
                movieCoverDiv.classList.add('justify-center')
                movieCoverDiv.classList.add('items-center')
                movieCoverDiv.classList.add('overflow-hidden')
                movieCoverDiv.classList.add('shadow-inner')
                movieCoverDiv.classList.add('border')
                movieCoverDiv.classList.add('dark:border-gray-700')
                const movieDetail = document.createElement('div')
                movieDetail.classList.add('p-5')
                const movieTitle = document.createElement('h5')
                movieTitle.classList.add('mb-2')
                movieTitle.classList.add('text-2xl')
                movieTitle.classList.add('font-bold')
                movieTitle.classList.add('tracking-tight')
                movieTitle.classList.add('text-gray-900')
                movieTitle.classList.add('dark:text-white')
                movieTitle.textContent = movie.title
                const movieYear = document.createElement('p')
                movieYear.classList.add('mb-3')
                movieYear.classList.add('font-normal')
                movieYear.classList.add('text-gray-700')
                movieYear.classList.add('dark:text-gray-400')
                movieYear.textContent = 'Lançado em: ' + movie.year
                if (movie.cover) {
                    const movieCoverImg = document.createElement('img')
                    movieCoverImg.classList.add('object-contain')
                    if (movie.cover.width > movie.cover.height) {
                        movieCoverImg.classList.add('h-auto')
                        movieCoverImg.classList.add('w-full')
                    } else {
                        movieCoverImg.classList.add('h-full')
                        movieCoverImg.classList.add('w-auto')
                    }
                    movieCoverImg.src = movie.cover.url
                    movieCoverDiv.appendChild(movieCoverImg)
                } else {
                    const textNoCover = document.createElement('p')
                    textNoCover.classList.add('text-center')
                    textNoCover.classList.add('text-gray-500')
                    textNoCover.classList.add('dark:text-gray-400')
                    textNoCover.textContent = 'Sem Capa!'
                    movieCoverDiv.appendChild(textNoCover)
                }
                movieCard.appendChild(movieCoverDiv)
                movieDetail.appendChild(movieTitle)
                movieDetail.appendChild(movieYear)
                movieCard.appendChild(movieDetail)
                elementMoviesGrid.appendChild(movieCard)
                isLoading = false
                removeLoading()
            })
        })
        .catch(error => {
            isLoading = false
            removeLoading()
            alert(error)
        })
}

document.addEventListener("DOMContentLoaded", function () {
    loadMoviesContent();
});