/**
 * Created by liuxiang on 18/05/03.
 */
export default {
  initVMovieCheckTable(state, data) {
    state.VMovieCheckTableList = data;
  },
  childTypeData(state, data) {
    state.VMovieChildTyeList = data;
  },
  childTypeData2(state, data) {
    state.VMovieChildTyeList2 = data;
  },
  initVMovieSeries(state, data) {
    state.VMovieSeries = data;
  },
  initVMovieVideoSeries(state, data) {
    state.VMovieVideoSeries = data;
  },
  initVMovieVideo(state, data) {
    state.VMovieVideoList = data;
  },
  initVMovieMiniMovie(state, data) {
    state.VMovieMiniVideoList = data;
  },
  initVMovieVideoCategories(state, data) {
    state.VMovieVideoCategoriesList = data;
  },
  initVMovieSeriesCategories(state, data) {
    state.VMovieVideoSeriesCategoriesList = data;
  },
  initVMovieSorting(state, data) {
    state.VMovieTypeList = data;
  },
  UploadVideo(state, data) {
    state.UploadVideoList = data;
  },
  initVMovieParentSorting(state, data) {
    state.VMovieParentTypeList = data;
  },

}
