import { getMovieGenre, getMovies } from "../axios/axios";
import MainVideo from "../components/ui/MainVideo";
import MovieSlider from "../components/ui/MovieSlider";
import { useQuery } from '@tanstack/react-query'

export default function Main() {
    const { data: action = [] } = useQuery({
        queryKey: ['movies', 'genre', 28],
        queryFn: () => getMovieGenre(28),
        staleTime: 5000
    })

    const { data: nowPlaying = [] } = useQuery({
        queryKey: ['movies', 'now_playing'],
        queryFn: () => getMovies('now_playing'),
        staleTime: 5000
    })
    /* 
        useQuery
        서버에서 데이터를 가져오고 캐싱하고 업데이트 해주는 라이브러리

        query를 사용하는 모든 컴포넌트에서값을 전달해주기 위해서
        queryClientProvider로 래핑해준다.
        보통 최상위 요소 ( app.js, index.js )에 래핑하는 것이 기본적
        queryClientProvider로 래핑된 하위 컴포넌트들은 query문을 전체적으로 공유받게 된다.

        staleTime : 재요청 시간을 의미
    */
    return (
        <>
            {/* <MainVideo /> */}
            <MovieSlider
                movies={nowPlaying?.slice(1, 11)}
                title='TOP 10 시리즈'
                type='nowPlaying'
                rate={true}
            />
            <MovieSlider movies={action} title="액션 장르" type='action' />
        </>
    )
}