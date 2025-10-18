
$(function () {
    let damageItems = [];
    const antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

    loadInitialData();

    function loadInitialData() {
        $.ajax({
            url: '/StockDamage/GetInitialData',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const godowns = data.Godowns || data.godowns || [];
                const items = data.Items || data.items || [];
                const currencies = data.Currencies || data.currencies || [];
                const employees = data.Employees || data.employees || [];

                $("#godownSelect,#itemSelect,#currencySelect,#employeeSelect")
                    .empty()
                    .append('<option value="">-- Select --</option>');

                godowns.forEach(g => {
                    const id = g.GodownNo ?? g.godownNo ?? g.Id;
                    const name = g.GodownName ?? g.godownName ?? g.Name;
                    $("#godownSelect").append(`<option value="${id}">${name}</option>`);
                });

                items.forEach(it => {
                    const code = it.SubItemCodeValue ?? it.subItemCodeValue ?? it.Code;
                    const name = it.SubItemName ?? it.subItemName ?? it.Name;
                    const unit = it.Unit ?? it.unit ?? '';
                    $("#itemSelect").append(`<option value="${code}" data-unit="${unit}">${name}</option>`);
                });

                currencies.forEach(c => {
                    const id = c.Id ?? c.id ?? c.CurrencyId;
                    const name = c.CurrencyName ?? c.currencyName ?? c.Name;
                    const rate = c.ConversionRate ?? c.conversionRate ?? 1;
                    $("#currencySelect").append(`<option value="${id}" data-rate="${rate}">${name}</option>`);
                });

                employees.forEach(emp => {
                    const id = emp.EmployeeID ?? emp.employeeID ?? emp.Id;
                    const name = emp.EmployeeName ?? emp.employeeName ?? emp.Name;
                    $("#employeeSelect").append(`<option value="${id}">${name}</option>`);
                });
            },
            error: function (xhr) {
                console.error("Failed to load initial data:", xhr);
            }
        });
    }

    $("#itemSelect").change(function () {
        const selected = $(this).find('option:selected');
        $("#itemCode").val(selected.val());
        $("#unit").val(selected.data('unit') || '');
    });

    // When currency changes, update conversion rate field with default rate
    $("#currencySelect").change(function () {
        const selected = $(this).find('option:selected');
        const defaultRate = parseFloat(selected.data('rate')) || 1;
        $("#conversionRate").val(defaultRate);
        updateAmountInput();
    });

    $("#quantityInput,#rateInput,#conversionRate").on("input change", updateAmountInput);

    function updateAmountInput() {
        const qty = parseFloat($("#quantityInput").val()) || 0;
        const rate = parseFloat($("#rateInput").val()) || 0;
        const userConversionRate = parseFloat($("#conversionRate").val()) || 1;
        
        // Calculate amount in the selected currency
        const amountInCurrency = qty * rate;
        
        // Convert to BDT using user-provided conversion rate
        const amountBDT = amountInCurrency * userConversionRate;
        
        $("#amountInput").val(amountBDT.toFixed(2));
    }

    $("#addBtn").click(function () {
        const godownVal = $("#godownSelect").val();
        const godownText = $("#godownSelect option:selected").text();
        const itemVal = $("#itemSelect").val();
        const itemText = $("#itemSelect option:selected").text();
        const batch = $("#batchNo").val();
        const qty = parseFloat($("#quantityInput").val()) || 0;
        const rate = parseFloat($("#rateInput").val()) || 0;
        const userConversionRate = parseFloat($("#conversionRate").val()) || 1;
        const currencyText = $("#currencySelect option:selected").text();
        const currencyId = $("#currencySelect").val();
        const employeeText = $("#employeeSelect option:selected").text();
        const employeeId = $("#employeeSelect").val();
        const unit = $("#unit").val();
        const remarks = $("#remarks").val();
        
        if (!godownVal || !itemVal || qty <= 0) {
            alert("Please select Warehouse, Item and enter a valid Quantity");
            return;
        }

        // Calculate amounts correctly
        const amountInCurrency = qty * rate; // Amount in the selected currency
        const amountBDT = amountInCurrency * userConversionRate; // Convert to BDT using user conversion rate

        damageItems.push({
            GodownNo: godownVal,
            GodownName: godownText,
            SubItemCodeValue: itemVal,
            SubItemName: itemText,
            BatchNo: batch,
            Quantity: qty,
            Rate: rate,
            ConversionRate: userConversionRate, // User-provided conversion rate
            CurrencyName: currencyText,
            CurrencyId: currencyId,
            AmountBDT: amountBDT, // Amount in BDT after conversion
            TotalAmount: amountBDT, // Same as AmountBDT for total calculation
            EmployeeName: employeeText,
            EmployeeId: employeeId,
            Unit: unit,
            Comments: remarks
        });

        renderTable();
        $("#stockDamageForm")[0].reset();
        $("#conversionRate").val(1); // Reset conversion rate to default
    });

    function renderTable() {
        const tbody = $("#damageTableBody").empty();
        if (!damageItems.length) {
            tbody.html('<tr><td colspan="12" class="text-center text-muted">No matching records found</td></tr>');
            $("#totalAmount").val('');
            return;
        }

        let totalBDT = 0;
        damageItems.forEach((d, i) => {
            // Recalculate to ensure consistency
            const amountInCurrency = d.Quantity * d.Rate;
            const amountBDT = amountInCurrency * d.ConversionRate;
            
            totalBDT += amountBDT;
            
            tbody.append(`
                <tr data-index="${i}">
                    <td>${i + 1}</td>
                    <td>${d.GodownName}</td>
                    <td>${d.SubItemName}</td>
                    <td>${d.SubItemCodeValue}</td>
                    <td>${d.BatchNo || ''}</td>
                    <td>${d.CurrencyName || ''}</td>
                    <td class="text-end">${d.Quantity}</td>
                    <td class="text-end">${d.Rate.toFixed(2)}</td>
                    <td class="text-end">${amountBDT.toFixed(2)}</td>
                    <td class="text-end">${d.ConversionRate.toFixed(4)}</td>
                    <td class="text-end">${amountBDT.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm editBtn"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-outline-danger btn-sm ms-1 deleteBtn"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `);
        });

        $("#totalAmount").val(totalBDT.toFixed(2));
    }

    $("#damageTableBody").on("click", ".editBtn", function () {
        const idx = $(this).closest("tr").data("index");
        const item = damageItems[idx];
        if (!item) return;

        $("#godownSelect").val(item.GodownNo);
        $("#itemSelect").val(item.SubItemCodeValue);
        $("#itemCode").val(item.SubItemCodeValue);
        $("#unit").val(item.Unit);
        $("#batchNo").val(item.BatchNo);
        $("#quantityInput").val(item.Quantity);
        $("#rateInput").val(item.Rate);
        $("#conversionRate").val(item.ConversionRate);
        $("#currencySelect").val(item.CurrencyId);
        $("#employeeSelect").val(item.EmployeeId);
        $("#remarks").val(item.Comments);

        damageItems.splice(idx, 1);
        renderTable();
    });

    $("#damageTableBody").on("click", ".deleteBtn", function () {
        const idx = $(this).closest("tr").data("index");
        damageItems.splice(idx, 1);
        renderTable();
    });

    $("#saveBtn").click(function () {
        if (damageItems.length === 0) { 
            alert("No data to save!"); 
            return; 
        }

        const btn = $(this);
        btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-1"></span>Saving...');

        // Prepare data for saving
        const saveData = {
            DamageDate: $("#damageDate").val(),
            Items: damageItems
        };

        $.ajax({
            url: '/StockDamage/SaveAll',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(saveData),
            headers: { 'RequestVerificationToken': antiForgeryToken },
            success: function (res) {
                if (res && res.success) {
                    alert(res.message || "Saved successfully");
                    damageItems = [];
                    renderTable();
                    $("#stockDamageForm")[0].reset();
                    $("#conversionRate").val(1);
                } else {
                    alert("Save failed: " + (res?.message ?? "unknown error"));
                }
            },
            error: function (xhr) {
                alert("Error saving data: " + xhr.status);
            },
            complete: function () {
                btn.prop("disabled", false).html('<i class="bi bi-save"></i> Save');
            }
        });
    });

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    $("#damageDate").val(today);
});
