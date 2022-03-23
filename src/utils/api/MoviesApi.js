const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies'

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`, alert(`Ошибка: ${res.status}`))
}

export default function getMovies() {
  return fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse)
}
