import type {ArticleProps} from "../types/ArticleProps"

function ArticleCard(props:ArticleProps) {
    return (
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <a href={props.link}
                   className="text-xl font-semibold text-blue-600 hover:underline block mb-2">{props.title}</a>
                <p className="text-gray-700 text-sm leading-relaxed">{props.summary}</p>
            </div>
    )
}

export default ArticleCard