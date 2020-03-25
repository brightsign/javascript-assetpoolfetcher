Sub Main()

  url$ = "file:///sd:/node-server.html"

	mp = CreateObject("roMessagePort")

	htmlRect = CreateObject("roRectangle", 0, 0, 1920, 1080)
	is = { port: 2999 }
	config = {
    	nodejs_enabled: true
    	inspector_server: is
    	brightsign_js_objects_enabled: true
      url: url$
	}
	htmlWidget = CreateObject("roHtmlWidget", htmlRect, config)
  htmlWidget.setPort(mp)
  htmlWidget.Show()

	while true
		ev = wait(0, mp)
		print "=== Received event ";type(ev)
	endwhile

End Sub
