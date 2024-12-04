import Axios from "axios";

export default function Test() {

    const handleTest = async () => {
        const response = await Axios.get('http://localhost:8080/')
            .then(response => {
                console.log(response.data); // 处理返回的数据
            })
            .catch(error => {
                console.error('There was an error!', error); // 错误处理
            });
        return response.data;
    };

    return (
        <>
            <button onClick={handleTest}>Test</button>
        </>
    );
}