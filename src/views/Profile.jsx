import {Box, Grid, Typography} from '@mui/material';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useState, useEffect} from 'react';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';

const Profile = () => {
  const {user} = useContext(MediaContext);

  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const {getTag} = useTag();

  const fetchAvatar = async () => {
    try {
      if (user) {
        const avatars = await getTag('avatar_' + user.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;
        setAvatar(ava);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [user]);

  return (
    <>
      {user && (
        <>
          <Box sx={{maxWidth: 'md', margin: 'auto', mt: 10}}>
            <Grid container direction={'row'} justifyContent="center">
              <Grid item sx={{px: 3}}>
                <img src={avatar.filename} alt="Logo" />
              </Grid>
              <Grid item sx={{px: 3}}>
                <Typography component="h1" variant="h3" sx={{mt: 2}}>
                  <strong>Profile</strong>
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong>Username : </strong> {user.username}
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong>Full name : </strong>{' '}
                  {user.full_name ? user.full_name : 'not found'}
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong>Email : </strong> {user.email}
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong> User ID : </strong> {user.user_id}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default Profile;
