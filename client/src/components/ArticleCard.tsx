import { Link } from 'react-router-dom'
import type {ArticleProps} from "../types/ArticleProps"

function ArticleCard(props:ArticleProps) {
    return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition">
                <Link to={`/articles/${props.id}`} className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline block mb-1">
                    {props.title}
                </Link>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-2">{props.summary}</p>
            </div>
    )
}

export default ArticleCard