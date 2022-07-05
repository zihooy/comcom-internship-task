import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

function App() {
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resData, setResData] = useState(null);
  const [formValue, setformValue] = useState({
    context: '',
    model: 'gpt2-story',
    length: 'long'
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  const fetchData = async () => {
    try {
      setError(null);
      setRes(null);
      setLoading(true);
      const formData = new FormData();
      formData.append('context', formValue.context);
      formData.append('model', formValue.model);
      formData.append('length', formValue.length);
      const response = await axios.post(
        'https://kubecon-tabtab-ainize-team.endpoint.ainize.ai/gpt2', formData
      );
      setRes(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const copyData = (res) => {
    const newData = formValue.context.concat(res);
    setformValue({
      ...formValue,
      context: newData
    });
  }

  return (
    <div>
      <body>
        <div className="container">
          <div className="mt-5 text-center fs-1 title">
            Create your own story
          </div>
          <div className="mt-5 text-center fs-5">
            You can make your own story here. <br></br>If you don't know how to continue the story, click the button to complete the sentence automatically.
          </div>
          <div class="input-group mt-2">
            <textarea name="context" class="form-control" rows="13" value={formValue.context} onChange={handleChange}></textarea>
          </div>
          <div className="mt-3 text-center fs-1">
            <button type="button" class="btn btn-outline-dark" onClick={() => fetchData()}>Click</button>
          </div>
          {res
            ? <>
              {loading ?
                <div>Loading...</div>
                :
                <div class="card mt-3 mb-3">
                  <ul class="list-group list-group-flush">
                    {Object.values(res).map(res => (
                      <li class="list-group-item">
                        <div class="d-flex justify-content-between">
                          <div> {res} </div>
                          <div>
                            <button type="button" class="btn btn-outline-light" onClick={() => copyData(res)}>Copy</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              }</>
            : <>
              {loading ? <div>Loading...</div> : <div></div>}
            </>
          }
        </div>
      </body>
      <footer class="text-white-50">
        <div className="text-center">
          <p>Demo project by <a href="https://github.com/zihooy" class="text-white">@Jihu Yang</a>.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
