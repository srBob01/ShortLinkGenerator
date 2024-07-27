-- Вставка тестовых данных в таблицу category
INSERT INTO category (title)
VALUES ('Technology'),
       ('Science'),
       ('Arts');

INSERT INTO links (link_name, short_link, long_link, create_date, last_modified_date, remove_date, id_category, id_user)
VALUES ('Google', 'G123456', 'https://www.google.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('StackOverflow', 'S123456', 'https://stackoverflow.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Wikipedia', 'W123456', 'https://www.wikipedia.org', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('GitHub', 'G234567', 'https://github.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Twitter', 'T123456', 'https://www.twitter.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Facebook', 'F123456', 'https://www.facebook.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('LinkedIn', 'L123456', 'https://www.linkedin.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('YouTube', 'Y123456', 'https://www.youtube.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Instagram', 'I123456', 'https://www.instagram.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Reddit', 'R123456', 'https://www.reddit.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Quora', 'Q123456', 'https://www.quora.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('Amazon', 'A123456', 'https://www.amazon.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Netflix', 'N123456', 'https://www.netflix.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Twitch', 'T234567', 'https://www.twitch.tv', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Pinterest', 'P123456', 'https://www.pinterest.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Microsoft', 'M123456', 'https://www.microsoft.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('Apple', 'A234567', 'https://www.apple.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Dropbox', 'D123456', 'https://www.dropbox.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Slack', 'S234567', 'https://www.slack.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36);

INSERT INTO links (link_name, short_link, long_link, create_date, last_modified_date, remove_date, id_category, id_user)
VALUES
    ('Yahoo', 'Y234567', 'https://www.yahoo.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('Bing', 'B123456', 'https://www.bing.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('Ask', 'A345678', 'https://www.ask.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('DuckDuckGo', 'D234567', 'https://www.duckduckgo.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('BBC', 'B234567', 'https://www.bbc.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('CNN', 'C123456', 'https://www.cnn.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('NYTimes', 'N345678', 'https://www.nytimes.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Guardian', 'G345678', 'https://www.theguardian.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Forbes', 'F234567', 'https://www.forbes.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Bloomberg', 'B345678', 'https://www.bloomberg.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Reuters', 'R234567', 'https://www.reuters.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('TechCrunch', 'T345678', 'https://www.techcrunch.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('HackerNews', 'H123456', 'https://news.ycombinator.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Medium', 'M234567', 'https://www.medium.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Vox', 'V123456', 'https://www.vox.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('BuzzFeed', 'B456789', 'https://www.buzzfeed.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Vice', 'V234567', 'https://www.vice.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Mashable', 'M345678', 'https://www.mashable.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Gizmodo', 'G456789', 'https://www.gizmodo.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Engadget', 'E123456', 'https://www.engadget.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('TheVerge', 'T456789', 'https://www.theverge.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Wired', 'W234567', 'https://www.wired.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('CNET', 'C234567', 'https://www.cnet.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('ZDNet', 'Z123456', 'https://www.zdnet.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('PCMag', 'P234567', 'https://www.pcmag.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Lifehacker', 'L234567', 'https://www.lifehacker.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Kotaku', 'K123456', 'https://www.kotaku.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Polygon', 'P345678', 'https://www.polygon.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('IGN', 'I234567', 'https://www.ign.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Gamespot', 'G567890', 'https://www.gamespot.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Metacritic', 'M456789', 'https://www.metacritic.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('RottenTomatoes', 'R345678', 'https://www.rottentomatoes.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('IMDb', 'I345678', 'https://www.imdb.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('Letterboxd', 'L345678', 'https://www.letterboxd.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
    ('SoundCloud', 'S345678', 'https://www.soundcloud.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('Spotify', 'S456789', 'https://www.spotify.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('Pandora', 'P456789', 'https://www.pandora.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('AppleMusic', 'A456789', 'https://www.music.apple.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('Deezer', 'D345678', 'https://www.deezer.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
    ('Tidal', 'T567890', 'https://www.tidal.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36);
