import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {request, loading, error, clearError} = useHttp()
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = '051183778bfcd424cc52a0243283985c';
    const _charOffset = '190';
    const _comicsOffset = '200';

    const getAllCharacters = async (offset = _charOffset) => {
        const response = await request(`${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_apiKey}`); //В response попадает промис с массивом персонажей
        return response.data.results.map(_transformCharacter); //возвращаем массив трансформированных объектов
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}/characters/${id}?apikey=${_apiKey}`); //В response попадает промис
        return _transformCharacter(response.data.results[0]); //возвращаем трансформированный объект
    }

    const getComic = async (id) => {
        const response = await request(`${_apiBase}/comics/${id}?apikey=${_apiKey}`);
        return _transformComics(response.data.results[0])
    }

    const getAllComics = async (offset = _comicsOffset) => {
        const response = await request(`${_apiBase}/comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return response.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => { //Получаем объект с персонажем, возвращаем объект только с нужными нам свойствами
        return {
            id: char.id,
            name: char.name,
            thumb: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            desc: char.description === '' ? 'No description for this character' : `${char.description.slice(0, char.description.indexOf(' ', 200))}...`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            isImgFound: !(`${char.thumbnail.path}` === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available')
        }
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            thumb: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            desc: comic.description === '' ? 'There is no description for this comic' : comic.description,
            pageCount: comic.pageCount,
            lang: comic.textObjects.language || 'en-us',
            price: comic.prices[0].price !== 0 ? `${comic.prices[0].price}$` : 'NOT AVAILABLE',
            isImgFound: !(`${comic.thumbnail.path}` === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'),
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;