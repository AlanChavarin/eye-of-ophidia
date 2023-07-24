const {getYoutubeParams} = require('../YoutubeParams')

test('Tests if youtube link returns video id', () => {
    expect(getYoutubeParams('https://www.youtube.com/watch?v=9Dmwn-rxdcc'))
    .toEqual(['9Dmwn-rxdcc', 0])
})

test('Tests if youtube link returns video id and timestamp', () => {
    expect(getYoutubeParams('https://www.youtube.com/watch?v=9Dmwn-rxdcc&t=1053s'))
    .toEqual(['9Dmwn-rxdcc', '1053'])
})