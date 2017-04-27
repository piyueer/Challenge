<html>
<body>
    <form class="form-horizontal" action="{{ route('purchase') }}" method="post">
        {{ csrf_field() }}
        name:<input type="text" name="customer_name">
        offering:<input type="text" name="offering_id">
        quantity:<input type="text" name="quantity">
        <button class="btn btn-primary" type="submit">submit</button>
    </form>
</body>
</html>