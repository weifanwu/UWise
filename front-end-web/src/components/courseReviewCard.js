const { createRoot } = ReactDOM;

const {  Card  } = antd;
const { Meta } = Card;
const App = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);
const ComponentDemo = App;


createRoot(mountNode).render(<ComponentDemo />);
