INSERT INTO category (title)
VALUES ('Technology'),
       ('Science'),
       ('Arts'),
       ('Health'),
       ('Sports'),
       ('Education'),
       ('Travel'),
       ('Food'),
       ('Business'),
       ('Finance'),
       ('Entertainment'),
       ('Music'),
       ('Movies'),
       ('Literature'),
       ('Fashion'),
       ('Photography'),
       ('Nature'),
       ('Politics'),
       ('History'),
       ('Gaming');

-- пароль 88888888
INSERT INTO users (firstname, lastname, username, email, password, create_date, last_modified_date, enabled,
                   account_locked, role)
VALUES ('Admin', 'admin', 'admin', 'admin@example.com', '$2a$10$yV30S57nDxIGXY5R6gdq6.3E/yHfP8nLekeOoM.6hoSgwhDFE8NFe',
        NOW(), NOW(), true, false, 'ADMIN'),
       ('User', 'user', 'user', 'user@user.com', '$2a$10$yV30S57nDxIGXY5R6gdq6.3E/yHfP8nLekeOoM.6hoSgwhDFE8NFe',
        NOW(), NOW(), true, false, 'USER'),
       ('UserForRemove', 'UserForRemove', 'UserForRemove', 'user@remove.com',
        '$2a$10$yV30S57nDxIGXY5R6gdq6.3E/yHfP8nLekeOoM.6hoSgwhDFE8NFe',
        NOW(), NOW(), true, false, 'USER');

INSERT INTO links (link_name, short_link, long_link, create_date, last_modified_date, remove_date, id_category, id_user)
VALUES ('Tech Crunch', 'T1Tech1', 'https://techcrunch.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Technology'), 1),
       ('Wired', 'T2Tech2', 'https://www.wired.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Technology'), 2),

       ('Science Daily', 'S1Sci1', 'https://www.sciencedaily.com', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Science'), 1),
       ('Nature', 'S2Sci2', 'https://www.nature.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Science'), 2),

       ('Artsy', 'A1Art1', 'https://www.artsy.net', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Arts'), 1),
       ('ArtStation', 'A2Art2', 'https://www.artstation.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Arts'), 2),

       ('WebMD', 'H1Heal1', 'https://www.webmd.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Health'), 1),
       ('Mayo Clinic', 'H2Heal2', 'https://www.mayoclinic.org', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Health'), 2),

       ('ESPN', 'S1Spor1', 'https://www.espn.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Sports'), 1),
       ('BBC Sport', 'S2Spor2', 'https://www.bbc.com/sport', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Sports'), 2),

       ('Khan Academy', 'E1Educ1', 'https://www.khanacademy.org', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Education'), 1),
       ('Coursera', 'E2Educ2', 'https://www.coursera.org', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Education'), 2),

       ('Lonely Planet', 'T1Trav1', 'https://www.lonelyplanet.com', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Travel'), 1),
       ('TripAdvisor', 'T2Trav2', 'https://www.tripadvisor.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Travel'), 2),

       ('AllRecipes', 'F1Food1', 'https://www.allrecipes.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Food'), 1),
       ('Food Network', 'F2Food2', 'https://www.foodnetwork.com', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Food'), 2),

       ('Forbes', 'B1Busi1', 'https://www.forbes.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Business'), 1),
       ('Bloomberg', 'B2Busi2', 'https://www.bloomberg.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Business'), 2),

       ('Investopedia', 'F1Fina1', 'https://www.investopedia.com', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Finance'), 1),
       ('Yahoo Finance', 'F2Fina2', 'https://finance.yahoo.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Finance'), 2),

       ('Entertainment Weekly', 'E1Ente1', 'https://ew.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Entertainment'), 1),
       ('BuzzFeed', 'E2Ente2', 'https://www.buzzfeed.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Entertainment'), 2),

       ('Rolling Stone', 'M1Musi1', 'https://www.rollingstone.com', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Music'), 1),
       ('Pitchfork', 'M2Musi2', 'https://pitchfork.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Music'), 2),

       ('IMDb', 'M1Movi1', 'https://www.imdb.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Movies'), 1),
       ('Rotten Tomatoes', 'M2Movi2', 'https://www.rottentomatoes.com', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Movies'), 2),

       ('Goodreads', 'L1Lite1', 'https://www.goodreads.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Literature'), 1),
       ('Project Gutenberg', 'L2Lite2', 'https://www.gutenberg.org', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Literature'), 2),

       ('Vogue', 'F1Fash1', 'https://www.vogue.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Fashion'), 1),
       ('Fashionista', 'F2Fash2', 'https://fashionista.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Fashion'), 2),

       ('National Geographic', 'P1Phot1', 'https://www.nationalgeographic.com/photography', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Photography'), 1),
       ('500px', 'P2Phot2', 'https://500px.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Photography'), 2),

       ('Nature Conservancy', 'N1Natu1', 'https://www.nature.org', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'Nature'), 1),
       ('BBC Earth', 'N2Natu2', 'https://www.bbcearth.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Nature'), 2),

       ('Politico', 'P1Poli1', 'https://www.politico.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Politics'), 1),
       ('The Hill', 'P2Poli2', 'https://thehill.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Politics'), 2),

       ('History Channel', 'H1Hist1', 'https://www.history.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'History'), 1),
       ('Smithsonian', 'H2Hist2', 'https://www.smithsonianmag.com/history', NOW() + INTERVAL '3 hours',
        NOW() + INTERVAL '3 hours', date_trunc('hour', NOW() + INTERVAL '1 hour'),
        (SELECT id FROM category WHERE title = 'History'), 2),

       ('IGN', 'G1Gami1', 'https://www.ign.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Gaming'), 1),
       ('GameSpot', 'G2Gami2', 'https://www.gamespot.com', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '3 hours',
        date_trunc('hour', NOW() + INTERVAL '1 hour'), (SELECT id FROM category WHERE title = 'Gaming'), 2);