import { useState } from "react";
import { data } from "./data/quiz-data";
import { useRef } from "react";

export default function Quiz() {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lockAns, setLockAns] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(-1);

    let pilihan1 = useRef(null);
    let pilihan2 = useRef(null);
    let pilihan3 = useRef(null);
    let pilihan4 = useRef(null);

    let arr_pilihan = [pilihan1, pilihan2, pilihan3, pilihan4];

    function checkAns(element, ans) {
        if (lockAns == false) {
            if (question.kunci == ans) {
                element.currentTarget.classList.add("bg-green-300");
                setLockAns(true);
                setScore(score + 1);
            } else {
                element.currentTarget.classList.add("bg-red-300");
                setLockAns(true);
                arr_pilihan[question.kunci - 1].current.classList.add(
                    "bg-green-300"
                );
            }
        }
    }

    function nextSection() {
        setResult(++result);
        return 0;
    }

    function nextQuestion() {
        if (lockAns == true) {
            if (index == data.length - 1) {
                setResult(++result);
                return 0;
            }

            setIndex(++index);
            setQuestion(data[index]);
            setLockAns(0);
            arr_pilihan.map((option) => {
                option.current.classList.remove("bg-green-300");
                option.current.classList.remove("bg-red-300");
            });
        }
    }

    function resetQuiz() {
        setResult(0);
        setIndex(0);
        setLockAns(false);
        setScore(0);

        setQuestion(data[0]);

        arr_pilihan.map((option) => {
            option.current.classList.remove("bg-green-300");
            option.current.classList.remove("bg-red-300");
        });

        return 0;
    }

    return (
        <div className="flex flex-col container  md:mx-auto border-[1.5px] border-black rounded-xl max-w-[750px] duration-300 bg-white">
            {result == -1 ? (
                <div className="m-10">
                    <h1 className="items-start mb-3 text-xl sm:text-4xl text-center mx-3 pb-5 border-b-[3.2px] border-black font-bold font-[Ubuntu]">
                        Hallo, Selamat Datang di Quiz Santuy
                    </h1>
                    <h2 className="my-3 mx-3 text-justify text-sm sm:text-md sm:text-xl font-[Ubuntu]">
                        Peraturan :
                    </h2>
                    <ul className="font-[Poppins]">
                        <li className="text-xs sm:text-sm m-2 rounded-md pl-3 text-left flex">
                            <h3 className="mr-2">1. </h3>
                            <p>
                                Setiap meng-
                                <span className="italic">input</span> jawaban,
                                kamu tidak bisa memilih jawaban lain, jadi
                                pastikan kalau itu sudah benar sebelum menjawab
                            </p>
                        </li>
                        <li className="text-xs sm:text-sm m-2 rounded-md pl-3 text-left flex">
                            <h3 className="mr-2">2.</h3>
                            <p>
                                Soal tidak bisa diulang, jadi pastikan kalau
                                kamu menjawab dengan benar
                            </p>
                        </li>
                    </ul>
                    <button
                        onClick={nextSection}
                        className="mb-3 my-3 text-center font-[Ubuntu] rounded-lg border-[1.6px] p-2.5 w-[100px] sm:w-[150px] bg-[#48c4e9ad] text-white border-gray-800 font-bold text-sm sm:text-md duration-300 hover:bg-white hover:text-black"
                    >
                        Mulai
                    </button>
                </div>
            ) : (
                <></>
            )}
            {result == 0 ? (
                <div className="m-10">
                    <h1 className="items-start mb-3 text-xl sm:text-5xl text-left mx-3 pb-5 border-b-[3.2px] border-black font-bold font-[Ubuntu]">
                        Quiz!!
                    </h1>
                    <h2 className="my-3 mx-3 text-left sm:test text-md sm:text-xl font-[Ubuntu]">
                        {index + 1}. {question.soal}
                    </h2>
                    <ul className=" grid grid-cols-1 justify-center items-center font-[Poppins]">
                        <li
                            ref={pilihan1}
                            onClick={(e) => {
                                checkAns(e, 1);
                            }}
                            className="border-[1.6px] flex border-black m-2 p-4 rounded-md text-left text-xs sm:text-md cursor-pointer duration-200 hover:shadow-lg shadow-gray-800"
                        >
                            <h3 className="mr-2">a.</h3>
                            <p>{question.pilihan1}</p>
                        </li>
                        <li
                            ref={pilihan2}
                            onClick={(e) => {
                                checkAns(e, 2);
                            }}
                            className="border-[1.6px] flex border-black m-2 p-4 rounded-md text-xs sm:text-md text-left cursor-pointer duration-200 hover:shadow-lg shadow-gray-800"
                        >
                            <h3 className="mr-2">b.</h3>
                            <p>{question.pilihan2}</p>
                        </li>
                        <li
                            ref={pilihan3}
                            onClick={(e) => {
                                checkAns(e, 3);
                            }}
                            className="border-[1.6px] flex border-black m-2 p-4 rounded-md text-left text-xs sm:text-md cursor-pointer duration-200 hover:shadow-lg shadow-gray-800"
                        >
                            <h3 className="mr-2">c.</h3>
                            <p>{question.pilihan3}</p>
                        </li>
                        <li
                            ref={pilihan4}
                            onClick={(e) => {
                                checkAns(e, 4);
                            }}
                            className="border-[1.6px] flex border-black m-2 p-4 rounded-md text-left text-xs sm:text-md cursor-pointer duration-200 hover:shadow-lg shadow-gray-800"
                        >
                            <h3 className="mr-2">d.</h3>
                            <p>{question.pilihan4}</p>
                        </li>
                    </ul>
                    <div className="mt-3 font-[Ubuntu]">
                        <button
                            onClick={nextQuestion}
                            className="mb-3 text-center rounded-lg border-[1.6px] p-2.5 w-[150px] bg-[#48c4e9ad] text-white border-gray-800 font-bold text-sm sm:text-md duration-300 hover:bg-white hover:text-black"
                        >
                            {index == data.length - 1
                                ? "Selesai"
                                : "Selanjutnya"}
                        </button>
                        <h3 className="text-xs sm:text-sm mt-3 text-gray-600">
                            Soal {index + 1} dari {data.length}
                        </h3>
                    </div>
                </div>
            ) : (
                <></>
            )}

            {result == 1 ? (
                <div className="m-10">
                    <h1 className="items-start mb-3 text-xl sm:text-4xl text-center mx-3 pb-5 border-b-[3.2px] border-black font-bold font-[Ubuntu]">
                        Selesai, yeeyyy
                    </h1>
                    <h2 className="my-3 mx-3 text-left sm:text-justify text-sm sm:text-xl font-[Ubuntu]">
                        Selamat sudah menyelesaikan Quiz santuyy ini, hasil dari
                        quiz kamu:
                    </h2>
                    <div className="min-h-[120px] flex items-center justify-center font-[Poppins] text-md sm:text-xl font-bold">
                        {score == data.length ? (
                            <h3>🎉 Keceee bangett bener semua 🎉</h3>
                        ) : (
                            <h3>
                                Kamu bener {score} dari {data.length}
                            </h3>
                        )}
                    </div>
                    <button
                        onClick={resetQuiz}
                        className="mb-3 my-3 text-center font-[Ubuntu] rounded-lg border-[1.6px] p-2.5 w-[150px] bg-[#48c4e9ad] text-white border-gray-800 font-bold text-sm sm:text-md duration-300 hover:bg-white hover:text-black"
                    >
                        Kerjakan Lagi
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
