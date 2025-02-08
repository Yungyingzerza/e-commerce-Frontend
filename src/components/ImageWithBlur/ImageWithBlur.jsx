export default function ImageWithBlur(props) {
    return (
        <>
            <div className="relative w-full flex items-center justify-center bg-gray-100 ">
                {/* Blurred Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center blur-2xl opacity-50 rounded-xl"
                    style={{
                        backgroundImage: `url('${props.url}')`,
                    }}
                ></div>

                {/* Main Image */}
                <img
                    className="relative z-10 h-96 object-contain rounded-lg shadow-lg"
                    src={props.url}
                    alt="Main"
                />
            </div>
        </>
    )
}