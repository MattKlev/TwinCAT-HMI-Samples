var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let CreateIndirectBinding;
        (function (CreateIndirectBinding) {
            function CreateIndirectArrayBinding(Control, Property, Symbol, Index, IsTwoWay, BindingEvent) {
                //Control: Controls.System.baseTcHmiControl, Property: string, Symbol: Symbol,
                //Index: Number, IsTwoWay: Boolean, BindingEvent: string
                debugger;
                // validate parameters
                if (!Control)
                    throw new Error("Invalid value: '" + Control + "' for parameter 'control'.");
                if (!Property)
                    throw new Error("Invalid value: '" + Property + "' for parameter 'propertyName'.");
                // check for existing binding
                const oldSymb = TcHmi.Binding.resolve(Property, Control);
                // remove if property is already bound
                if (oldSymb) {
                    // remove existing binding
                    TcHmi.Binding.removeEx2(oldSymb, Property, Control);
                }
                // get symbol name, remove prepending '%/s%' (server symbol identifier)
                let symbStr = Symbol.getExpression().toString().slice(0, -4);
                console.log("symbol expression: " + symbStr);
                let regex = /[[]/;
                let startIndex = symbStr.search(regex);
                console.log('Start index: ' + startIndex);
                regex = /]/;
                let EndIndex = symbStr.search(regex);
                EndIndex = EndIndex + 1;
                console.log('End index: ' + EndIndex);
                let StartOfString = symbStr.slice(0, startIndex);
                console.log('Start of string: ' + StartOfString);
                let EndofString = symbStr.slice(EndIndex);
                console.log('End of string: ' + EndofString);
                console.log('Index value: ' + Index.toString());
                let NewsymbStr = StartOfString + '[' + Index.toString() + ']' + EndofString;
                // append two-way binding
                if (IsTwoWay) {
                    NewsymbStr = NewsymbStr + "|BindingMode=TwoWay|BindingEvent=" + BindingEvent + "|SubscriptionMode=Change%/s%";
                }
                else {
                    NewsymbStr = NewsymbStr + '%/s%';
                }
                console.log('new string: ' + NewsymbStr);
                // create symbol type for validation
                const symb = new TcHmi.Symbol(NewsymbStr);
                // validate symbol
                if (symb) {
                    // create binding
                    TcHmi.Binding.createEx2(NewsymbStr, Property, Control);
                }
                else
                    throw new Error("Invalid value: '" + NewsymbStr + "' for parameter 'Symbol'.");
            }
            CreateIndirectBinding.CreateIndirectArrayBinding = CreateIndirectArrayBinding;
        })(CreateIndirectBinding = Functions.CreateIndirectBinding || (Functions.CreateIndirectBinding = {}));
        Functions.registerFunctionEx('CreateIndirectArrayBinding', 'TcHmi.Functions.CreateIndirectBinding', CreateIndirectBinding.CreateIndirectArrayBinding);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=CreateIndirectArrayBinding.js.map