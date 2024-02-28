import { Box } from '@mui/material';

const SupportedPayments = () => {
  const imgStyle = { width: '51px', height: '34px' };
  return (
    <Box
      sx={{
        borderRadius: '9px',
        borderColor: `rgb(221,221,221)`,
        backgroundColor: 'white',
        borderStyle: 'solid',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        padding: '10px',
        border: '0',
      }}>
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2021/03/09/161528368123dd7a35ad8708b0dfc74b3630526891.webp'
      />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/06/06/15282732803587566708.webp' />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/06/06/15282732983375743706.webp' />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/06/06/1528273036537082707.webp' />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/06/06/1528273151799711689.webp' />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/06/06/15282731342688549608.webp' />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/06/06/15282719811871317559.webp' />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2020/09/23/1600828366fdedf14c91b84e675f838988a91f7ad0.webp'
      />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2022/10/18/1666059343f885bbe5200643cf6e5520edf4d48f44.webp'
      />
      <Box sx={imgStyle} component='img' src='//img.ltwebstatic.com/images2_pi/2018/08/31/15356946304173589516.webp' />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2021/01/15/1610701410b3781f00695b77b833e6b6a5e38331a3.webp'
      />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2021/08/02/162790376859463644223852a19dd980bbc128a587.webp'
      />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2022/05/05/1651733282ff6b345534cfad09ad4f3f86c14d5b1a.webp'
      />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2023/05/29/1685342766a65f1c91843f5e3191183263e8aeca54.webp'
      />
      <Box
        sx={imgStyle}
        component='img'
        src='//img.ltwebstatic.com/images3_pi/2023/10/30/13/169863276243bf4e90e9f85458890bed15c5a5aee7.webp'
      />
    </Box>
  );
};

export default SupportedPayments;
