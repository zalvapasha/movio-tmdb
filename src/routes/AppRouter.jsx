import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import HomePage from '../pages/HomePage';
import MoviesPopularPage from '../pages/MoviesPopularPage';
import MoviesNowPlayingPage from '../pages/MoviesNowPlayingPage';
import MoviesUpcomingPage from '../pages/MoviesUpcomingPage';
import MoviesTopRatedPage from '../pages/MoviesTopRatedPage';
import TVShowsPopularPage from '../pages/TVShowsPopularPage';
import TVShowsAiringTodayPage from '../pages/TVShowsAiringTodayPage';
import TVShowsOnTVPage from '../pages/TVShowsOnTVPage';
import TVShowsTopRatedPage from '../pages/TVShowsTopRatedPage';




const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                    <MainLayout>
                        <HomePage/>
                    </MainLayout>
                    }
                />

                {/* Movies */}
                <Route
                    path='/movies/popular'
                    element={
                    <MainLayout>
                        <MoviesPopularPage/>
                    </MainLayout>
                    }
                />

                <Route
                    path='/movies/now-playing'
                    element={
                    <MainLayout>
                        <MoviesNowPlayingPage/>
                    </MainLayout>
                    }
                />

                <Route
                    path='/movies/upcoming'
                    element={
                    <MainLayout>
                        <MoviesUpcomingPage/>
                    </MainLayout>
                    }
                />

                <Route
                    path='/movies/top-rated'
                    element={
                    <MainLayout>
                        <MoviesTopRatedPage/>
                    </MainLayout>
                    }
                />
                
                {/* TV Shows */}
                <Route
                    path='/tv/popular'
                    element={
                    <MainLayout>
                        <TVShowsPopularPage/>
                    </MainLayout>
                    }
                />

                <Route
                    path='/tv/airing-today'
                    element={
                    <MainLayout>
                        <TVShowsAiringTodayPage/>
                    </MainLayout>
                    }
                />

                <Route
                    path='/tv/on-tv'
                    element={
                    <MainLayout>
                        <TVShowsOnTVPage/>
                    </MainLayout>
                    }
                />

                <Route
                    path='/tv/top-rated'
                    element={
                    <MainLayout>
                        <TVShowsTopRatedPage/>
                    </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;