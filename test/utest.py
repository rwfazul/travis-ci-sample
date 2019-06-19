import unittest
import mock

class MockTest(unittest.TestCase):
	def setUp(self):
		self.playlists = mock.gen_playlists()
		self.musics = mock.gen_musics()

	def test_gen_playlist(self):
		self.assertIs(len(mock.gen_playlists(12)), 10)

	def test_gen_musics(self):
		self.assertIs(len(mock.gen_musics(10)), 10)

	def test_remove_playlist(self):
		size = len(self.playlists)
		res = mock.remove_playlist_by_id(self.playlists, 1)
		self.assertIs(size - 1, len(res))

	def test_remove_music(self):
		size = len(self.musics)
		res = mock.remove_music_by_id(self.musics, 1)
		self.assertIs(size - 1, len(res))

	def test_add_playlist(self):
		size = len(self.playlists)
		res = mock.add_playlist(self.playlists, mock.gen_playlists(1)[0])
		self.assertIs(size + 1, len(res))

	def test_add_music(self):
		size = len(self.musics)
		res = mock.add_music(self.musics, mock.gen_musics(1)[0])
		self.assertEqual(size + 1, len(res))

	def test_get_playlist(self):
		self.assertIsNotNone(mock.get_playlist_by_id(self.playlists, 1))
		self.assertIsNone(mock.get_playlist_by_id(self.playlists, -1))

	def test_get_music(self):
		self.assertIsNotNone(mock.get_music_by_id(self.musics, 1))
		self.assertIsNone(mock.get_music_by_id(self.musics, -1))

if __name__ == '__main__':
    unittest.main(verbosity=2)
