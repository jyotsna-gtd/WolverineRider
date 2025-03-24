import React from 'react';

const InfoSection = () => {
    return (
        <div className="container-fluid mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Note Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Note:</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>For booking pay ₹5,000 per person, after that payment policy mentioned below will be applicable.</li>
                        <li>Group discount available.</li>
                        <li>The above-mentioned tour prices are per person for Indian Nationals only.</li>
                        <li>Pending payments may eventually lead to the cancellation of the trip.</li>
                    </ul>
                </div>

                {/* Why Book with Us Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Why Book with Us?</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Customer care available 24/7.</li>
                        <li>No-hassle best price guarantee.</li>
                        <li>Hand-picked itinerary.</li>
                        <li>Complimentary riding gears.</li>
                        <li>Local team for 24x7 support.</li>
                    </ul>
                </div>

                
                {/* confirmation policy*/}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Confirmation Policy</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Payments can be done in 3 parts.</li>
                        <li>After processing the booking amount you will get an email confirmation.</li>
                        <li>Once you paid the 100% amount for your booking, you will get an invoice containing all the information about the trip.</li> 
                    </ul>
                </div>

                
                {/* Payment Terms Policy */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Payment Terms Policy</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>On the date of booking, 5000 Per Person</li>
                        <li>45 days before trip departure 70% of the total cost </li>
                        <li>30 days before trip  departure 100% of total cos</li>
                    </ul>
                </div>


                {/* Cancellation Policy */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Cancellations are made before 30 days from the date of travel then 20% of the total trip will be charged.</li>
                        <li>Cancellations are made between 15  to 30 days from the date of travel then 50% of the total trip will be charged.</li>
                        <li>Cancellations are made between 0  to 15 days from the date of travel then 100% of the total trip will be charged</li>
                    </ul>
                </div>

 {/* Refund Policy */}
 <div>
                    <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Refund amount will be processed within 2 week on business days.</li>
                        <li>All applicable refunds will be done in the traveler’s Bank Transfer only</li>
                    </ul>
                </div>




            </div>
        </div>
    );
};

export default InfoSection;
