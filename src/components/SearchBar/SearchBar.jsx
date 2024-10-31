import {Search as SearchIcon} from 'react-bootstrap-icons'
import s from './style.module.css'
export function SearchBar({onSubmit}){

    function submit(e){
        if(e.key === 'Enter' && e.target.value !== ''){
            console.log(e.target.value)
            onSubmit(e.target.value)
            e.target.value = ''
        }
    }

    return (
        <>
            <SearchIcon  size={27} className={s.icon} />
            <input onKeyUp={submit} className={s.input} type='text' placeholder='search a tv show you may like' />
        </>
    )
}