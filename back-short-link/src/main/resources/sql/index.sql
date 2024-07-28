CREATE INDEX idx_users_firstname ON users (firstname);
CREATE INDEX idx_users_lastname ON users (lastname);
CREATE INDEX idx_users_create_date ON users (create_date);

CREATE INDEX idx_tokens_id_user ON tokens (id_user);

CREATE INDEX idx_links_long_link ON links (long_link);
CREATE INDEX idx_links_create_date ON links (create_date);
CREATE INDEX idx_links_remove_date ON links (remove_date);
CREATE INDEX idx_links_id_category ON links (id_category);
CREATE INDEX idx_links_id_user ON links (id_user);