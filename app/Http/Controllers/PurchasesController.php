<?php
namespace App\Http\Controllers;

use App\Models\Offering;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchasesController extends Controller
{
    public function getAllOfferings()
    {
        $offerings = Offering::all()->toArray();

        return json_encode(['offering' => $offerings]);
    }

    public function getPurchases()
    {
        $purchases = Purchase::with(['offering'])->get()->toArray();

        return json_encode(['purchase' => $purchases]);
    }

    public function postPurchases(Request $request)
    {
        $parameters = $request->all();

        Purchase::insert([
            'customer_name' => $parameters['customer_name'],
            'offering_id' => $parameters['offering_id'],
            'quantity' => $parameters['quantity']
        ]);

        return 'ok';
    }
}