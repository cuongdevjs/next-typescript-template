import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectHome } from './selectors';

const Home = memo(() => {
  const home = useSelector(selectHome);
  console.log('🚀 ~ file: index.tsx ~ line 9 ~ Home ~ home', home);

  return (
    <div id="home">
      <h2>Hello World</h2>
    </div>
  );
});

export default Home;
