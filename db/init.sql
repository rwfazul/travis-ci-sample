CREATE DATABASE IF NOT EXISTS db_playlists;

USE db_playlists;

CREATE TABLE IF NOT EXISTS playlists (
	id_playlist		INT	     AUTO_INCREMENT,
	nome_playlist		VARCHAR(255) NOT NULL,
	estilo_playlist		VARCHAR(100) NOT NULL,
	obs_playlist		VARCHAR(250) NOT NULL,
	PRIMARY KEY		(id_playlist)
);

CREATE TABLE IF NOT EXISTS musicas (
	id_musica		INT 	     AUTO_INCREMENT,
	nome_musica		VARCHAR(255) NOT NULL,
	criador_musica		VARCHAR(255) NOT NULL,
	estilo_musica		VARCHAR(100) NOT NULL,
	id_playlist		INT 	     NOT NULL,
	PRIMARY KEY		(id_musica),
	FOREIGN KEY		(id_playlist) REFERENCES playlists (id_playlist) ON DELETE CASCADE
);
