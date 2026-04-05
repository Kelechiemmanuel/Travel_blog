import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/');
      setMessage(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sendData = async () => {
    if (!title || !description) return;
    try {
      await axios.post('http://localhost:5001/', {
        title,
        description
      })
    } catch (error) {
      console.log(error);
    }
    fetchData();
    setTitle('');
    setDescription('');

  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-30 justify-items-center py-5'>
        {message.map((msg, index) => (
          <div key={msg.id} className='border border-amber-500 p-10'>
            <div className=''>{msg.title}</div>
            <div>{msg.description}</div>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center gap-5'>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'  className='border border-amber-400
        outline-0 p-5
        '/>
        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className='border border-amber-400 outline-0 p-2'></textarea>
        <button onClick={sendData} className='cursor-pointer'>Send</button>
      </div>
    </div>
  )
}

export default App