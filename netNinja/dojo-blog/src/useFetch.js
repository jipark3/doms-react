import { useState, useEffect } from "react";

//custom Hook ; use 를 사용해야 한다.
const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //abort controller 생성
    const abortCont = new AbortController();

    //여기서는 async await 을 쓸 수 없다.
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal }) //두번째 매개변수로 signal을 넣어준다.
        .then(res => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then(_data => {
          setData(_data);
          setIsPending(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === "AbortError") {
            console.log("fetch error");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]); //url이 바뀔때마다 다시 실행시키도록

  return { data, isPending, error };
};

export default useFetch;
