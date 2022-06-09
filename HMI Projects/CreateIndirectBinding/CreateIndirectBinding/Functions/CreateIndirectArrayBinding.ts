module TcHmi {
	export module Functions {
		export module CreateIndirectBinding {
            export function CreateIndirectArrayBinding(Control: Controls.System.baseTcHmiControl, Property: string, Symbol: Symbol, Index: Number, IsTwoWay: Boolean, BindingEvent: string) {
                //Control: Controls.System.baseTcHmiControl, Property: string, Symbol: Symbol,
                //Index: Number, IsTwoWay: Boolean, BindingEvent: string
                debugger;

                // validate parameters
                if (!Control) throw new Error("Invalid value: '" + Control + "' for parameter 'control'.");
                if (!Property) throw new Error("Invalid value: '" + Property + "' for parameter 'propertyName'.");

                // check for existing binding
                const oldSymb: string | null = TcHmi.Binding.resolve(Property, Control);

                // remove if property is already bound
                if (oldSymb) {
                    // remove existing binding
                    TcHmi.Binding.removeEx2(oldSymb, Property, Control);
                }

                // get symbol name, remove prepending '%/s%' (server symbol identifier)
                let symbStr: string = Symbol.getExpression().toString().slice(0, -4);

                console.log("symbol expression: " + symbStr);

                let regex = /[[]/;
                let startIndex: number = symbStr.search(regex);
                console.log('Start index: ' + startIndex);

                regex = /]/;
                let EndIndex: number = symbStr.search(regex);
                EndIndex = EndIndex + 1
                console.log('End index: ' + EndIndex);

                let StartOfString: string = symbStr.slice(0, startIndex);
                console.log('Start of string: ' + StartOfString);

                let EndofString: string = symbStr.slice(EndIndex);
                console.log('End of string: ' + EndofString);

                console.log('Index value: ' + Index.toString());

                let NewsymbStr: string = StartOfString + '[' + Index.toString() + ']' + EndofString;


                // append two-way binding
                if (IsTwoWay) {
                    NewsymbStr = NewsymbStr + "|BindingMode=TwoWay|BindingEvent=" + BindingEvent + "|SubscriptionMode=Change%/s%";
                }
                else {
                    NewsymbStr = NewsymbStr + '%/s%';
                }

                console.log('new string: ' + NewsymbStr);

                // create symbol type for validation
                const symb: Symbol = new TcHmi.Symbol(NewsymbStr);


                // validate symbol
                if (symb) {
                    // create binding
                    TcHmi.Binding.createEx2(NewsymbStr, Property, Control);
                }
                else throw new Error("Invalid value: '" + NewsymbStr + "' for parameter 'Symbol'.");

			}
		}
		registerFunctionEx('CreateIndirectArrayBinding', 'TcHmi.Functions.CreateIndirectBinding', CreateIndirectBinding.CreateIndirectArrayBinding);
	}
}