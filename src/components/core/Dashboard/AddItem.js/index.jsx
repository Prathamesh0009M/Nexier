import RenderSteps from "./RenderSteps";

export default function AddItem() {
    return (
        <>
            <div className="text-white w-full md:w-[350px] bg-richblack-700 p-5 rounded-lg shadow-lg overflow-hidden">
                <div className="mb-4">
                    <p className="text-2xl font-bold text-center mb-3">Add Item</p>
                    <div>
                        <RenderSteps />
                    </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
                    <p className="text-lg font-semibold mb-2">Item Upload Tips</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Provide a clear and concise item title.</li>
                        <li>Set a competitive price or offer for free if applicable.</li>
                        <li>Add high-quality images of the item for better visibility.</li>
                        <li>Include a detailed description with the item's condition.</li>
                        <li>Specify item availability and expected delivery time.</li>
                        <li>Ensure all mandatory fields are filled correctly.</li>
                        <li>Consider offering discounts to attract more buyers.</li>
                        <li>Regularly update your listings for better engagement.</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
